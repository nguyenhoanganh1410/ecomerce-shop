import AtIcon from "@/components/icons/incentives/at"
import DiscountIcon from "@/components/icons/incentives/discount"
import HeartIcon from "@/components/icons/incentives/heart"
import StarIcon from "@/components/icons/incentives/star"

export default function IncentivesComponent() {
  const incentives = [
    {
      name: 'million plus luxury products',
      icon: <StarIcon />,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet ultrices ullamcorper interdum sit laoreet at ut et.'
    },
    {
      name: 'share your',
      icon: <AtIcon />,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet ultrices ullamcorper interdum sit laoreet at ut et.'
    },
    {
      name: 'wishlist profiles',
      icon: <HeartIcon />,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet ultrices ullamcorper interdum sit laoreet at ut et.'
    },
    {
      name: 'discounted',
      icon: <DiscountIcon />,
      description: 'Shop huge,members-only sales and gain access to exclisive pricing.'
    }
  ]

  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-20 lg:mt-[50px] xl:mt-[125px]">
      <div className="rounded-2xl py-16">
        <div className="mx-auto max-w-xl lg:max-w-none">
          <div className="mx-auto mt-12 grid max-w-sm grid-cols-1 gap-x-8 gap-y-10 sm:max-w-none lg:grid-cols-4">
            {incentives.map((incentive) => (
              <div key={incentive.name} className="text-center sm:flex sm:text-left lg:block lg:text-center">
                <div className="sm:flex-shrink-0">
                  <div className="flow-root">
                    <div className="mx-auto w-10">
                      {incentive.icon}
                    </div>
                  </div>
                </div>
                <div className="mt-3 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-xs font-bold uppercase  text-[#202223]">{incentive.name}</h3>
                  <p className="mt-2 text-xs font-normal  text-[#202223]">{incentive.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
