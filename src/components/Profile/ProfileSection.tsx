interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
}

const ProfileSection = ({ title, children }: ProfileSectionProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
};

export default ProfileSection;
