const UserName = ({ username }: { username: string }) => {
  if (!username) return null;
  return <div className="text-lg font-bold hidden md:block">{username}</div>;
};

export default UserName;
