import React, { ChangeEvent, useState } from "react";

type SearchType = "job" | "people";

const useSearch = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchType, setSearchType] = useState<SearchType>("job");

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSearchType(e.target.value as SearchType);
    };

    const search = () => {
        console.log(searchQuery, searchType);
    };

    return {
        searchQuery: searchQuery,
        searchType: searchType,
        handleSearchChange,
        handleSearchTypeChange,
        search,
    };
};

export default useSearch;
