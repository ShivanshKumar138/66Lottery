import React from 'react';
import Mobile from '../Components/Mobile';
import { useParams
 } from 'react-router-dom';
const one = [
    {
      title: 'First Deposit Bonus',
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
    {
      pageTitle:"First Deposit Bonus"
    }
  ];


  const two = [
    {
      title: 'Activity Bonus',
      amount: '₹12,600,000',
      invitations: '30,000',
      img: "https://image.0nxq4.cc/banner/202501302242153927073.png"
    },
    {
      title: 'BMW x2 CAR Reward',
      amount: '₹5,500,000',
      invitations: '8,000',
      img: 'https://image.0nxq4.cc/banner/202502012233338892081.png',
    },
    {
      pageTitle:"Activity Bonus"
    }
  ];



  const three = [
    {
    text: "Weekly Bonus",
      amount: '₹12,600,000',
      invitations: '30,000',
      img: "https://image.0nxq4.cc/banner/202502012242337312071.png"
    },
    {
      title: 'BMW x3 CAR Reward',
      amount: '₹5,500,000',
      invitations: '8,000',
      img: 'https://image.0nxq4.cc/banner/202502142240127006009.png',
    },
    {
      pageTitle:"Weekly Bonus"
    }
  ];



  const four = [
    {
      title: 'VIP Bonus',
      amount: '₹12,600,000',
      invitations: '30,000',
      img: "https://image.0nxq4.cc/banner/202501241602163829010.png"
    },
    {
      title: 'BMW x4 CAR Reward',
      amount: '₹5,500,000',
      invitations: '8,000',
      img: 'https://image.0nxq4.cc/banner/202410212236076343001.png',
    },
    {
      pageTitle:"Vip Bonus"
    }
  ];

const RewardCard = ({ reward, index,id}) => (
  <div className="p-4 border border-orange-300 rounded-lg shadow-md bg-white">
    <h2 className="text-xl font-bold text-orange-500">
      {reward.title}
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
  const {id}=useParams();
  console.log(id);
  return (
    <Mobile>
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        {eval(id)[2].pageTitle}
      </h1>
      <div className="space-y-6">
        {eval(id).map((reward, index) => (
          <RewardCard key={index} reward={reward} index={index} id={id} />
        ))}
      </div>
    </div>
    </Mobile>
  );
};

export default BannerDetail;
