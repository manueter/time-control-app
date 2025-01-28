import { useState, useEffect } from "react";
import { FaSearch, FaEye } from "react-icons/fa";

interface TableProps<T> {
  headers: string[];
  elements: T[];
  onViewProfile?: (element: T) => void;
}

const Table = <T extends { [key: string]: any }>({
  headers,
  elements,
  onViewProfile,
}: TableProps<T>) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredElements, setFilteredElements] = useState(elements);

  useEffect(() => {
    const results = elements.filter((element) =>
      Object.values(element).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredElements(results);
  }, [searchTerm, elements]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Directory</h1>
        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-800 text-gray-100 border border-gray-700 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="bg-gray-800">
                {headers.map((header, index) => (
                  <th key={index} className="px-4 py-2 text-left">
                    {header}
                  </th>
                ))}
                {onViewProfile && <th className="px-4 py-2 text-left">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredElements.map((element, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                  } hover:bg-gray-600 transition-colors duration-200`}
                >
                  {Object.values(element).map((value, valueIndex) => (
                    <td key={valueIndex} className="px-4 py-2">
                      {value}
                    </td>
                  ))}
                  {onViewProfile && (
                    <td className="px-4 py-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded-full transition-colors duration-200 flex items-center"
                        onClick={() => onViewProfile(element)}
                        aria-label={`View profile`}
                      >
                        <FaEye className="mr-1" />
                        View Profile
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
