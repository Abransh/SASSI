"use client"

import { useRouter } from "next/navigation";

interface UniversityFilterProps {
  universities: { university: string }[];
  currentValue: string;
  searchQuery?: string;
}

export default function UniversityFilter({ 
  universities, 
  currentValue, 
  searchQuery 
}: UniversityFilterProps) {
  const router = useRouter();
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    let url = `/members?university=${value}`;
    
    if (searchQuery) {
      url += `&query=${searchQuery}`;
    }
    
    router.push(url);
  };
  
  return (
    <select
      name="university"
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
      value={currentValue}
      onChange={handleChange}
    >
      <option value="">All Universities</option>
      {universities.map((uni, index) => (
        <option key={index} value={uni.university}>
          {uni.university}
        </option>
      ))}
    </select>
  );
}