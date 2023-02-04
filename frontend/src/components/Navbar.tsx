import { Select, Avatar, Button } from "flowbite-react";
import { useThemeMode } from "../context/themeContext";
import { IoMoonOutline, IoSunnySharp, IoSearch } from "react-icons/io5";
import { useGetUserQuery } from "../features/auth/authSlice";
import useSearch from "../hooks/useSearch";

const Navbar = ({ userData, userError }: any) => {
    const { toggleTheme, isDarkMode } = useThemeMode();
    const { handleSearchChange, searchType, search, handleSearchTypeChange } =
        useSearch();

    let isLoggedIn = true;

    if (
        userError?.data?.message &&
        userError.data.message.includes("No Authorization")
    ) {
        isLoggedIn = false;
    }

    return (
        <div className="bg-[rgba(255,255,255,.06)] backdrop-blur shadow-sm h-[60px]">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex justify-between flex-[.2] items-center h-[60px]">
                    <div>
                        <h1 className="h2 dark:text-white text-black">
                            Job Portal
                        </h1>
                    </div>
                    <div className="flex items-center flex-[.8]">
                        {isLoggedIn && (
                            <>
                                <div className="w-[500px] relative flex items-center">
                                    <input
                                        placeholder={`Search for ${searchType}`}
                                        onChange={handleSearchChange}
                                        className="border-none w-full placeholder:text-[14px] outline-none pl-2.5 py-2.5 pr-[60px] text-[16px] text-gray-700 rounded-lg backdrop-blur dark:bg-[rgba(255,255,255,.02)] bg-[rgba(0,0,0,.05)]"
                                    />
                                    <div
                                        className="absolute right-4 cursor-pointer"
                                        onClick={search}
                                    >
                                        <IoSearch className="text-[20px] text-gray-600" />
                                    </div>
                                </div>
                                <Select
                                    className="bg-[rgba(255,255,255,.02)]"
                                    onChange={handleSearchTypeChange}
                                >
                                    <option value="job">Job(s)</option>
                                    <option value="people">People(s)</option>
                                </Select>
                            </>
                        )}
                    </div>
                    <div>
                        <div className="flex items-center gap-x-4 justify-end">
                            <Button onClick={toggleTheme} outline={true}>
                                {isDarkMode ? (
                                    <IoSunnySharp />
                                ) : (
                                    <IoMoonOutline />
                                )}
                            </Button>
                            {isLoggedIn && (
                                <Avatar
                                    img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                    rounded={true}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
