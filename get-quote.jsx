import Head from 'next/head';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import useDOMStore from '@/stores/useDOMStore';
import useAnimationStore from '@/stores/useAnimationStore';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { FiLoader } from 'react-icons/fi';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import CONSTANTS from '@/utils/constants';
import { stripNullableFields } from '@/utils/helpers';
import styles from './get-quote.module.css';

export default function GetQuote() {
	const { isComprehensive, setIsComprehensive, setQuoteResult, quoteData, setQuoteData, setPaymentData, paymentData } = useDOMStore();
	const { data: session, status } = useSession();
	const { toggleQuoteResultSlide, quoteResultSlide } = useAnimationStore();
	const [displayBodyTypeAsSelect, setDisplayBodyTypeAsSelect] = useState(true);

	const params = useSearchParams();
	const [loadingGetQuote, setLoadingGetQuote] = useState(false);
	const [localQuoteData, setLocalQuoteData] = useState({
		coverType: params.get('motorPolicy') === CONSTANTS.COMPREHENSIVE_INSURANCE_PRODUCT_ID ? 'Comprehensive' : 'Third Party',
		duration: 'Annual',
		mobileNetwork: 'MTN',
		// Get Quote Payload / Create Policy Payload
		class: '2',
		product_id: params.get('motorPolicy') === CONSTANTS.COMPREHENSIVE_INSURANCE_PRODUCT_ID ? CONSTANTS.COMPREHENSIVE_INSURANCE_PRODUCT_ID : CONSTANTS.THIRD_PARTY_INSURANCE_PRODUCT_ID,
		start_date: new Date().toISOString().split('T')[0],
		policy_start: new Date().toISOString().split('T')[0],
		vehicle_yr_manufacture: new Date().getFullYear().toString(),
		vehicle_extra_seats: 0,
		customer_name: session?.user?.name,
		username: session?.user?.name,
		prefcontact: session?.user?.phoneNumber,
		prefemail: session?.user?.email,
		vehicle_engine_no: 'T558956565GH4184646',
		vehicle_drive_type: "4-Wheel Drive",
		prefemail: "",
		vehicle_fuel_type: "PETROL",
		...quoteData,
	});
	const [error, setError] = useState('');

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		let payload = { ...localQuoteData, [name]: value };

		if (name === 'product_id')
			if (value === CONSTANTS.COMPREHENSIVE_INSURANCE_PRODUCT_ID) {
				setIsComprehensive(true);
				payload = { ...localQuoteData, [name]: value, coverType: 'comprehensive' };
			} else {
				setIsComprehensive(false);
				payload = { ...localQuoteData, [name]: value, coverType: 'third party' };
			}

		if (name === 'vehicle_usage_type') {
			if (name === 'vehicle_usage_type') {
				const selectedOption = e.target.options[e.target.selectedIndex];
				const seats = selectedOption.dataset.seats;

				payload = { ...payload, vehicle_seating: seats };
			}
		}

		if (value === "start_date") {
			payload = { 
				...localQuoteData, 
				[name]: value,
				policy_start: value,
			};
		}

		setLocalQuoteData(payload);
	};

	useEffect(() => {
		const policyType = params.get('motorPolicy');
		if (policyType === CONSTANTS.COMPREHENSIVE_INSURANCE_PRODUCT_ID) {
			setIsComprehensive(true);
			setLocalQuoteData({ ...localQuoteData, product_id: CONSTANTS.COMPREHENSIVE_INSURANCE_PRODUCT_ID, coverType: 'comprehensive' });
		} else {
			setIsComprehensive(false);
			setLocalQuoteData({ ...localQuoteData, product_id: CONSTANTS.THIRD_PARTY_INSURANCE_PRODUCT_ID, coverType: 'third party' });
		}
	}, [params.get('motorPolicy')]);

	const handleSubmit = async (e) => {
		setLoadingGetQuote(true);

		e.preventDefault();
		setError('');

		try {
			const result = await axios.post('/api/policy-quote', stripNullableFields(localQuoteData));

			setQuoteData(localQuoteData);
			setQuoteResult(result.data.message.net_premium);
			setPaymentData({
				...paymentData,
				customer_name: session?.user.name,
				customer_code: session?.user.id,
				customer_number: session?.user.phoneNumber,
				policies: session?.user.policies,
				amtdue: result.data.message.net_premium,
				amount: result.data.message.net_premium,
				value: result.data.message.net_premium,
			});
			toggleQuoteResultSlide();
		} catch (error) {
			let errorMsg = error?.response?.details || error.message || 'Failed to get quote. Please try again.';

			toast.error(errorMsg, { duration: 30000 });
			setError('An error occurred. Please try again.');
		} finally {
			setLoadingGetQuote(false);
		}
	};

	return (
		<>
			<Head>
				<title>Get Instant Quote</title>
			</Head>

			<main className={` ${styles.pageWrapper}`}>
				<div className='container'>
					<div className={styles.pageHeader}>
						<Link href='/'>
							<img src='/back.svg' alt='Back icon' />
						</Link>
						<div>
							<div className={'heading-2'}>Policy Information</div>
							<p style={{fontWeight: "bold", color: "GrayText"}}>Complete the form below to create a new policy or get policy quote.</p>
						</div>
					</div>

					<form className={`${styles.authForm}`} onSubmit={handleSubmit}>
						<div className='formField'>
							<p>Cover Type</p>
							<select name='product_id' className='input' onChange={handleInputChange} value={localQuoteData.product_id}>
								<option value='31' defaultValue={params.get('motorPolicy') === CONSTANTS.COMPREHENSIVE_INSURANCE_PRODUCT_ID}>
									Comprehensive
								</option>
								<option value='32' defaultValue={params.get('motorPolicy') === CONSTANTS.THIRD_PARTY_INSURANCE_PRODUCT_ID}>
									Third Party
								</option>
							</select>
						</div>

						<div className='formGroup'>
							<p>Duration</p> <p>Start Date</p>
							<select name='duration' className='input' disabled value={'annual' || localQuoteData.duration} onChange={handleInputChange}>
								{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month) => (
									<option key={month} value={`${month} month${month > 1 ? 's' : ''}`}>
										{month} Month{month > 1 ? 's' : ''}
									</option>
								))}
								<option value='annual'>Annual</option>
							</select>
							<input type='date' name='start_date' value={localQuoteData.start_date} onChange={handleInputChange} className='input' />
						</div>

						<div className='formGroup'>
							<p>Customer Name</p>
							<p>Vehicle Registration Number</p>
							<input type='text' name='customer_name' value={localQuoteData.customer_name} onChange={handleInputChange} className='input' required />
							<input type='text' name='vehicle_registration_no' value={localQuoteData.vehicle_registration_no} onChange={handleInputChange} className='input' required />
						</div>

						<div className='formGroup'>
							<p>Contact Number</p>
							<p>Email</p>
							<input required type='tel' name='prefcontact' pattern='0[0-9]{9}' placeholder='0XXXXXXXXX' value={localQuoteData.prefcontact} onChange={handleInputChange} className='input' />
							<input required type='email' name='prefemail' value={localQuoteData.prefemail} onChange={handleInputChange} className='input' />
						</div>

						{/* <div className='formField'>
							<p>Vehicle Engine Number</p>
							<input type='text' name='vehicle_engine_no' value={localQuoteData.vehicle_engine_no} onChange={handleInputChange} className='input' required />
						</div> */}

						<div className='formGroup'>
							<p>Make</p> <p>Model</p>
							<input type='text' name='vehicle_make' value={localQuoteData.vehicle_make} onChange={handleInputChange} className='input' required />
							<input type='text' name='vehicle_model' value={localQuoteData.vehicle_model} onChange={handleInputChange} className='input' required />
						</div>

						<div className='formGroup'>
							<p>Year of Manufacture</p>
							<p>Cubic Capacity</p>
							<input type='number' placeholder='e.g. 2024' name='vehicle_yr_manufacture' value={localQuoteData.vehicle_yr_manufacture} onChange={handleInputChange} className='input' required />
							<input type='number' name='vehicle_cc' placeholder='Cc' value={localQuoteData.vehicle_cc} onChange={handleInputChange} className='input' required min={0} step={1} />
						</div>

						<div className='formGroup'>
							<p>Vehicle Usage</p>
							<p>Vehicle Color</p>
							{/* // Todo: Get usage list from Genova API */}
							<select name='vehicle_usage_type' className='input' value={localQuoteData.vehicle_usage_type} required onChange={handleInputChange}>
								<option value=''></option>
								<option value='1' data-seats='5' data-vehicle='1'>
									X.1(Private Cars (Individual))
								</option>
								<option value='2' data-seats='5' data-vehicle='1'>
									X.4(Private Cars ( Corporate))
								</option>
								<option value='3' data-seats='3' data-vehicle='1'>
									Own Goods Carrying Z.300
								</option>
								<option value='22' data-seats='3' data-vehicle='1'>
									Own Goods Carrying Z.300 (3000+)
								</option>
								<option value='23' data-seats='3' data-vehicle='1'>
									General Cartage Z.301 (3000+)
								</option>
								<option value='4' data-seats='3' data-vehicle='1'>
									General Cartage Z.301
								</option>
								<option value='5' data-seats='5' data-vehicle='1'>
									Taxis (Z.405)
								</option>
								<option value='6' data-seats='5' data-vehicle='1'>
									Hire Cars
								</option>
								<option value='7' data-seats='12' data-vehicle='1'>
									Mini Buses
								</option>
								<option value='8' data-seats='23' data-vehicle='1'>
									Maxi Buses
								</option>
								<option value='9' data-seats='5' data-vehicle='1'>
									Ambulance/Hearse
								</option>
								<option value='10' data-seats='1' data-vehicle='1'>
									Z.802 Special Types (Road)
								</option>
								<option value='11' data-seats='1' data-vehicle='1'>
									Z.802 Special Types (Site)
								</option>
								<option value='12' data-seats='2' data-vehicle='1'>
									Motor Trade Plate Class 1
								</option>
								<option value='13' data-seats='2' data-vehicle='1'>
									Motor Trade Plate Class 2
								</option>
								<option value='14' data-seats='2' data-vehicle='1'>
									Motor Trade Plate Class 3
								</option>
								<option value='15' data-seats='2' data-vehicle='2'>
									Motor Cycle (Individual)
								</option>
								<option value='16' data-seats='2' data-vehicle='2'>
									Motor Cycle (Corporate)
								</option>
								<option value='17' data-seats='15' data-vehicle='1'>
									Corporate Buses
								</option>
								<option value='18' data-seats='3' data-vehicle='1'>
									Tankers
								</option>
								<option value='19' data-seats='3' data-vehicle='1'>
									Articulator/Oil Tanker
								</option>
								<option value='20' data-seats='12' data-vehicle='1'>
									TroTro Mini buses
								</option>
							</select>
							<input type='text' name='vehicle_colour' value={localQuoteData.vehicle_colour} onChange={handleInputChange} className='input' required />
						</div>

						<div className='formGroup'>
							<p>Seating Capacity</p> <p>Extra Seats</p>
							<input type='number' name='vehicle_seating' disabled value={localQuoteData.vehicle_seating} onChange={handleInputChange} className='input' required />
							<input type='number' min='0' step='1' name='vehicle_extra_seats' value={localQuoteData.vehicle_extra_seats} onChange={handleInputChange} className='input' />
						</div>

						<div className='formGroup'>
							<p>Chassis Number</p> <p>Number of Cylinders</p>
							<input required type='text' name='vehicle_chassis_no' value={localQuoteData.vehicle_chassis_no} onChange={handleInputChange} className='input' />
							<input required type='number' min='0' step='1' name='vehicle_no_cylinders' value={localQuoteData.vehicle_no_cylinders} onChange={handleInputChange} className='input' />
						</div>

						<div className='formGroup'>
							<p>Body Type</p> <p>Drive Type</p>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									textAlign: 'left',
								}}
							>
								{displayBodyTypeAsSelect ? (
									<select name='vehicle_body_type' value={localQuoteData.vehicle_body_type} onChange={handleInputChange} className='input' required>
										<option value=''></option>
										<option value='Saloon'>Saloon</option>
										<option value='Lift Back'>Lift Back</option>
										<option value='Hatchback'>Hatchback</option>
										<option value='Station Wagon'>Station Wagon</option>
										<option value='Estate'>Estate</option>
										<option value='Truck'>Truck</option>
										<option value='Pick-Up Double Cabin'>Pick-Up Double Cabin</option>
										<option value='Pick-Up Single Cabin'>Pick-Up Single Cabin</option>
										<option value='Articulator Head'>Articulator Head</option>
										<option value='Tanker'>Tanker</option>
										<option value='Excavator'>Excavator</option>
										<option value='Back Hoe'>Back Hoe</option>
										<option value='Motor Bike'>Motor Bike</option>
										<option value='Tricycle'>Tricycle</option>
										<option value='Mini Van'>Mini Van</option>
										<option value='Maxi Van'>Maxi Van</option>
										<option value='Mini Bus'>Mini Bus</option>
										<option value='Maxi Bus'>Maxi Bus</option>
									</select>
								) : (
									<input type='text' name='vehicle_body_type' value={localQuoteData.vehicle_body_type} onChange={handleInputChange} className='input' required />
								)}
								<button
									onClick={() => setDisplayBodyTypeAsSelect(!displayBodyTypeAsSelect)}
									type='button'
									style={{
										fontSize: '0.75rem',
										color: 'blue',
										width: '100%',
										display: 'block',
										textAlign: 'left',
										textDecoration: 'underline',
										margin: '0',
										padding: 0,
									}}
								>
									{displayBodyTypeAsSelect ? 'Enter custom value' : 'Choose Body Type'}
								</button>
							</div>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
								}}
							>
								<select name='vehicle_drive_type' value={localQuoteData.vehicle_drive_type} onChange={handleInputChange} className='input' required>
									<option value='4-Wheel Drive' selected>4-Wheel Drive</option>
									<option value='2-Wheel Drive'>2-Wheel Drive</option>
								</select>
								<div></div>
							</div>
						</div>

						<div className='formGroup'>
							<p>Buy Excess</p>
							<p>Fuel Type</p>
							<select name='buy_excess' className='input' value={localQuoteData.buy_excess} onChange={handleInputChange}>
								<option value='0'>No/Applicable</option>
								<option value='1'>Yes/Bought</option>
							</select>
							<select name='vehicle_fuel_type' value={localQuoteData.vehicle_fuel_type} onChange={handleInputChange} className='input'>
								<option value='PETROL'>Petrol</option>
								<option value='DIESEL'>Diesel</option>
								<option value='ELECTRIC'>Electric</option>
								<option value='HYBRID'>Hybrid</option>
							</select>
						</div>

						{isComprehensive && (
							<>
								{/* <div className='formGroup'>
									<p>Vehicle Trim</p> <p>Number of Cylinders</p>
									<input type='text' name='vehicle_trim' value={localQuoteData.vehicle_trim} onChange={handleInputChange} className='input' required />
									<input type='number' name='vehicle_no_cylinders' value={localQuoteData.vehicle_no_cylinders} onChange={handleInputChange} className='input' required />
								</div> */}

								{/* <div className='formGroup'>
									<p>Previous Insurer</p> <p>Certificate Number</p>
									<input type='text' name='vehicle_previous_insurer' value={localQuoteData.vehicle_previous_insurer} onChange={handleInputChange} className='input' />
									<input type='text' name='cert_no' value={localQuoteData.cert_no} onChange={handleInputChange} className='input' />
								</div> */}
								{/* <div className='formGroup'>
									<p>Claim Free</p> <p>Customer ID</p>
									<select name='vehicle_claim_free' value={localQuoteData.vehicle_claim_free} onChange={handleInputChange} className='input'>
										<option value='0'>No</option>
										<option value='1'>Yes</option>
									</select>
									<input type='text' name='customer_id' value={localQuoteData.customer_id} onChange={handleInputChange} className='input' />
								</div> */}
								<div className='formGroup'>
									<p>Sum Insured</p>
									<p>User Type</p>
									<input type='text' name='sum_insured' placeholder='Enter the value of your vehicle' value={localQuoteData.sum_insured} onChange={handleInputChange} className='input' required />
									<select name='user_type' value={localQuoteData.user_type} onChange={handleInputChange} className='input'>
										<option value='private'>Private</option>
										<option value='individual'>Individual</option>
									</select>
								</div>

								{/* <div className='formField'>
									<p>Additional Remarks</p>
									<textarea name='vehicle_additional_remarks' value={localQuoteData.vehicle_additional_remarks} onChange={handleInputChange} className='input' />
								</div> */}
							</>
						)}

						<div className='formField'>
							<button type='submit' className='primary-button'>
								Get Quote Now
								{loadingGetQuote && (
									<FiLoader
										className='spin'
										style={{
											width: '1.5rem',
											height: '1.5rem',
										}}
									/>
								)}
							</button>
						</div>
					</form>
				</div>
			</main>
		</>
	);
}
