import React from "react";
import { IOrginazation } from "../../features/orginazation/orginazationSilce";
import Button from "../Button";

interface Props extends IOrginazation {}

export const OrginazationCard = (props: IOrginazation) => {
    const {
        about,
        coverPhoto,
        headline,
        location,
        name,
        orginazationType,
        photo,
        website,
        author,
    } = props.data;

    console.log(props.data);

    return (
        <div className="relative flex flex-col justify-between pb-5 w-[400px] min-h-[250px] bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div>
                <div className="w-full h-[80px]">
                    <img
                        className="rounded-t-lg w-full h-full"
                        src={coverPhoto.secureUrl}
                        alt="cover"
                    />
                </div>
                <div className="px-5">
                    <div className="flex">
                        <div className="w-[90px]">
                            <div className="absolute top-10 w-[80px] overflow-hidden ">
                                <img className="w-full h-full" src={photo.secureUrl} alt="photo" />
                            </div>
                        </div>
                        <div className="ml-4">
                            <h5 className="text-[20px] font-bold tracking-tight text-gray-900 dark:text-white">
                                {name}
                            </h5>
                            <p className="dark:text-gray-500 text-gray-500 text-[12px] ml-1">
                                {orginazationType} .{" "}
                                {`${location.country} | ${location.state} ${location.city}`}
                            </p>
                        </div>
                    </div>
                    <p className="mb-3 mt-2 font-normal text-gray-700 dark:text-gray-400">
                        {headline}
                    </p>
                </div>
            </div>
            <div className="px-5">
                <Button outline>View</Button>
            </div>
        </div>
    );
};
