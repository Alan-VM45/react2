interface SearchBarProps {
    placeholder?: string;
    onSearch: (value: string) => void;
}

const SearchBar = ({ placeholder = "Buscar...", onSearch }: SearchBarProps) => {
    return (
        <div className="relative w-full max-w-md">
        <input
            type="text"
            placeholder={placeholder}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
        />
        </div>
    );
};

export default SearchBar;