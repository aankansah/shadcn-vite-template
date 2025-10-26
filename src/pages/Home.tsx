import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoyaltyBrandedCard from '../components/LoyaltyBrandedCard'
import PolicyDashboardCard from '../components/PolicyDashboardCard'
import BranchesModal from '../components/BranchesModal'
import ClaimsModal from '../components/ClaimsModal'
import { Button } from '../components/ui/button'

export default function Home() {
  const navigate = useNavigate()
  const [isBranchesModalOpen, setIsBranchesModalOpen] = useState(false)
  const [isClaimsModalOpen, setIsClaimsModalOpen] = useState(false)
  
  const policyTypes = [
    {
      title: 'Third Party',
      description: "Cover the third party's damages",
      slug: 'buy-motor?type=third-party'
    },
    {
      title: 'Comprehensive',
      description: 'Covers your private or commercial vehicles',
      slug: 'buy-motor?type=comprehensive'
    },
    {
      title: 'Marine',
      description: 'Covers all risks of loss or damage to the vessel',
      slug: 'marine'
    },
    {
      title: 'Money',
      description: 'Covers your private or commercial vehicles',
      slug: 'money'
    },
    {
      title: 'Fire',
      description: 'Covers Loss or Damage resulting from Fire',
      slug: 'fire'
    },
    {
      title: 'Liability',
      description: 'Covers the risk',
      slug: 'liability'
    }
  ]

  const handlePolicyClick = (slug: string) => {
    navigate(`/policies/${slug}`)
  }

  return (
    <div className='pt-10 space-y-10 w-full h-full overflow-y-auto overflow-x-clip'>
      {/* Greeting */}
      <div className='mb-6 px-10'>
        <h1 className='text-xl text-gray-900 mb-2'>
          Hi 👋, <span className='uppercase font-bold text-2xl bg-linear-to-tr from-[#44cd54] to-[#426cb3] bg-clip-text text-transparent'>Augustine Amoh NKansah</span>
        </h1>
      </div>

      {/* Your Policies Section */}
      <div className="px-10">
        <PolicyDashboardCard 
          title="Your Policy Dashboard" 
          className="mb-6"
        />
      </div>

      {/* All Policies Section */}
      <div className='mb-6'>
        <div className='flex items-center justify-between mb-4 px-10'>
          <h2 className='text-xl font-bold text-gray-900'>All Policies</h2>
        </div>
        
        <div className='flex gap-4 overflow-x-auto pb-2 py-2 scrollbar-hide pl-10'>
          {policyTypes.map((policy, index) => (
            <LoyaltyBrandedCard
              key={index}
              title={policy.title}
              description={policy.description}
              className="w-[250px] h-[320px] shrink-0 grow-0"
              animated={true}
              onClick={() => handlePolicyClick(policy.slug)}
            />
          ))}
        </div>
      </div>

      {/* Bottom Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 px-10'>
        <LoyaltyBrandedCard 
          title="Make a claim"
          variant="large"
        >
          <Button size='lg' onClick={() => setIsClaimsModalOpen(true)}>
            Make a Claim
          </Button>
        </LoyaltyBrandedCard>

        <LoyaltyBrandedCard 
          title="Branches"
          variant="large"
        >
          <Button onClick={() => setIsBranchesModalOpen(true)}>
            Find Us
          </Button>
        </LoyaltyBrandedCard>
      </div>

      {/* Branches Modal */}
      <BranchesModal 
        isOpen={isBranchesModalOpen}
        onClose={() => setIsBranchesModalOpen(false)}
      />

      {/* Claims Modal */}
      <ClaimsModal 
        isOpen={isClaimsModalOpen}
        onClose={() => setIsClaimsModalOpen(false)}
      />
    </div>
  )
}