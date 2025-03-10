import React from 'react';
import Mobile from '../Components/Mobile';
const rewards = [
    {
      title: 'Luxury Apartment Reward',
      amount: '₹12,600,000',
      invitations: '30,000',
      img: "https://image.0nxq4.cc/banner/202501302231412536065.png"
    },
    {
      title: 'BMW x1 CAR Reward',
      amount: '₹5,500,000',
      invitations: '8,000',
      img: 'https://image.0nxq4.cc/banner/202501302236098829072.png',
    },
  ];

const RewardCard = ({ reward, index }) => (
  <div className="p-4 border border-orange-300 rounded-lg shadow-md bg-white">
    <h2 className="text-xl font-bold text-orange-500">
      {index + 1}. Partner Reward Program - {reward.title}
    </h2>
    <div className="relative mt-4">
      <img src={reward.img} alt={reward.title} className="w-full rounded-md" />
      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-md">
        {reward.amount}
      </div>
    </div>
    <p className="mt-2 text-sm text-gray-700">
      Refer <span className="font-bold">{reward.invitations}</span> invitations and top up at least 3 times.<br/>
      <span className="font-bold">3 months</span> to complete this task starting from <span className="font-bold">2025/1/25</span>.
    </p>
  </div>
);

const BannerDetail = () => {
  return (
    <Mobile>
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        66lottery Partner Bonus Program
      </h1>
      <div className="space-y-6">
        {rewards.map((reward, index) => (
          <RewardCard key={index} reward={reward} index={index} />
        ))}
      </div>
    </div>
    </Mobile>
  );
};

export default BannerDetail;
