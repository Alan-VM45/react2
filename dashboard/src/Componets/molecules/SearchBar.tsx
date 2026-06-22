interface SearchBarProps {
    placeholder?: string;
    onSearch: (value: string) => void;
}

const SearchBar = ({ placeholder = "Buscar...", onSearch }: SearchBarProps) => {
    return (
        <div className="relative w-full">
        <input
            type="text"
            placeholder={placeholder}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-[#2a2a2a] text-[#a0a0a0] px-3 py-2 rounded border border-[#2a2a2a] focus:outline-none focus:border-[#ec0000] transition text-sm"
        />
        </div>
    );
};

export default SearchBar;