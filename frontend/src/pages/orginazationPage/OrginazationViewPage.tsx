import { useLocation, useParams } from "react-router-dom";
import CoverPhoto from "../../components/CoverPhoto";
import GradientLayout from "../../components/GradientLayout";
import Layout from "../../components/Layout";
import TabView from "../../components/TabView";
import { useGetOrginazationQuery } from "../../features/orginazation/orginazationSilce";

interface Props {}

const OrginazationViewPage = () => {
  const params = useParams();

  let orginazationID = params.orginazationID as string;
  const { isLoading, data } = useGetOrginazationQuery({ orginazationID });

  return (
    <GradientLayout>
      <Layout>
        <CoverPhoto
          photoUrl={data?.data.photo.secureUrl}
          coverUrl={data?.data.coverPhoto.secureUrl}
          name={data?.data.name}
          headline={data?.data.headline}
          location={data?.data.location}
          companyType={data?.data.orginazationType}
        />
        <div>
          <TabView tabsTitle={["About", "Jobs", "People"]}>
            <div className="dark:text-gray-400 px-5 mt-2">
              <h1 className="">{data?.data.about}</h1>
            </div>
            <h1 className="">Jobs</h1>
            <h1 className="">People</h1>
          </TabView>
        </div>
      </Layout>
    </GradientLayout>
  );
};

export default OrginazationViewPage;
