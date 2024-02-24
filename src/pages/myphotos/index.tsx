import Layout from "@/components/layout";
import { useUserAuth } from "@/context/userAuthContext";
import { getPostByUserId } from "@/repository/post.service";
import { DocumentResponse, Post } from "@/types";
import { HeartIcon } from "lucide-react";
import * as React from "react";

interface IMyPhotosProps {}

const MyPhotos: React.FunctionComponent<IMyPhotosProps> = () => {
  const { user } = useUserAuth();
  const [data, setData] = React.useState<DocumentResponse[]>([]);

  const getAllPost = async (id: string) => {
    try {
      const querySnapshot = await getPostByUserId(id);
      const tempArr: DocumentResponse[] = [];
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Post;
          const responseObj: DocumentResponse = {
            id: doc.id,
            ...data,
          };
          console.log("The response object is : ", responseObj);
          tempArr.push(responseObj);
        });
        setData(tempArr);
      } else {
        console.log("No such document");
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (user != null) {
      getAllPost(user.uid);
    }
  }, []);

  const renderPost = () => {
    return data.map((item) => {
      return (
        <div key={item.photos[0].uuid} className="relative">
          <div className="absolute group transition-all duration-200 bg-transparent hover:bg-slate-950 hover:bg-opacity-75 top-0 bottom-0 left-0 right-0 w-full h-full">
            <div className="flex flex-col justify-center items-center w-full h-full">
              <HeartIcon className="hidden group-hover:block fill-white" />
              <div className="hidden group-hover:block text-white">
                {item.likes} likes
              </div>
            </div>
          </div>
          <img
            src={`${item.photos[0].cdnUrl}/-/progressive/yes/-/scale_crop/300x300/center/`}
          />
        </div>
      );
    });
  };

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="border max-w-3xl w-full">
          <h3 className="bg-slate-800 text-white text-center text-lg p-2">
            My Photos
          </h3>
          <div className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {data ? renderPost() : <div>...Loading</div>}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyPhotos;
