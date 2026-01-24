export const formatRelativeTime = (dateString: string) => {
  const createdDate = new Date(dateString);
  const now = new Date();
  
  const diffInHours = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return "Agora mesmo";
  if (diffInHours >= 24) return `${Math.floor(diffInHours / 24)}d atrás`;
  
  return `Há ${diffInHours}h`;
};