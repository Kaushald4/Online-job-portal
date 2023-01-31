import UserCoverPlaceholder from "../assets/user-cover.png";
import UserProfilePlaceholder from "../assets/blank-profile.webp";
import Button from "./Button";

interface Props {
  photoUrl?: string;
  coverUrl?: string;
  name?: string;
  location?: {
    city: string;
    state: string;
    country: string;
  };
  headline?: string;
  companyType?: string;
  profile?: boolean;
  onEditClick?: () => void;
}

const CoverPhoto = (props: Props) => {
  const {
    photoUrl,
    coverUrl,
    headline,
    location,
    name,
    companyType,
    profile,
    onEditClick,
  } = props;

  return (
    <div className="w-full h-[350px]">
      <div className="relative">
        <div className="h-[190px] w-full">
          <img
            src={coverUrl || UserCoverPlaceholder}
            alt="cover"
            className="h-full w-full"
          />
        </div>
        <div className="flex">
          <div className="w-[220px]">
            <div className="absolute left-10 bottom-[10px] w-[120px] h-[120px]">
              <img
                src={photoUrl || UserProfilePlaceholder}
                alt="photo"
                className="h-full w-full"
              />
            </div>
          </div>
          <div className="mt-2 w-full">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[24px] text-black dark:text-white">
                  {name}
                </h2>
                <p className="text-black text-[16px] ml-2 dark:text-gray-300">
                  {headline}
                </p>
              </div>
              {/* edit profile button */}
              <div>
                {profile && (
                  <Button onClick={onEditClick} outline>
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
            <p className="text-[14px] dark:text-gray-500">{companyType}</p>
            <p className="text-black text-[15px] ml-2 dark:text-gray-200">
              <span className="mr-1">{location?.country} </span>
              <span className="mr-1">{location?.state} </span>
              <span>{location?.city}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverPhoto;
