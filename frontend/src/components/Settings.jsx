import axios from "axios";
import { useEffect, useState } from "react"
import { HiPencil } from "react-icons/hi2";
import { toast } from "react-toastify";

const Settings = () => {

  const [user, setUser] = useState(null);
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newProfile, setNewProfile] = useState("");
  const [refresh, setRefresh] = useState(false);

  const data = JSON.parse(localStorage.getItem("user"));
  const token = data?.userData?.token;

  const convertToBase64 = (e) => {
    let reader = new FileReader();

    if (e.target.files[0]) {
      if (e.target.files[0].size > 5 * 1000 * 1024) {
        toast.error(`File can't be bigger than 5MB`, {
          theme: "dark",
          autoClose: 2000,
          hideProgressBar: true,
        });
        setNewProfile("");
        e.target.value = "";
      } else {
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
          const img = new Image();
          img.src = reader.result;
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const MAX_WIDTH = 1024;
            const MAX_HEIGHT = 1024;
            let width = img.width;
            let height = img.height;
            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7);

            setNewProfile(compressedDataUrl);
          };
        };

        reader.onerror = (error) => {
          toast.error('Failed to upload file', {
            theme: "dark",
            autoClose: 2000,
            hideProgressBar: true,
          });
          console.log(error);
        };
      }
    }
  };

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setUser(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUserDetails();
    setRefresh(false);
  }, [token, refresh]);

  const handleNameChange = async () => {
    if (!newName) {
      toast.error("Name cannot be empty", {
        theme: "dark",
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
    else {
      try {
        await axios.patch(`http://localhost:3000/api/v1/user/update`,
          { name: newName },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        setRefresh(true);
      } catch (error) {
        console.log(error);
      } finally {
        setNewName("");
      }
    }
  }

  const handleEmailChange = async (e) => {
    e.preventDefault();
    if (!newEmail) {
      toast.error("Email cannot be empty", {
        theme: "dark",
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
    else {
      try {
        await axios.patch(`http://localhost:3000/api/v1/user/update`,
          { email: newEmail },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        toast.success("Email changed", {
          theme: "dark",
          autoClose: 2000,
          hideProgressBar: true,
        });
        setRefresh(true);
      } catch (error) {
        console.log(error);
      } finally {
        setNewEmail("");
      }
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!newPassword) {
      toast.error("Email cannot be empty", {
        theme: "dark",
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
    else {
      try {
        await axios.patch(`http://localhost:3000/api/v1/user/update`,
          { password: newPassword },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        toast.success("Password changed", {
          theme: "dark",
          autoClose: 2000,
          hideProgressBar: true,
        });
        setRefresh(true);
      } catch (error) {
        console.log(error);
      } finally {
        setNewPassword("");
      }
    }
  }

  const handleProfileChange = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3000/api/v1/user/update`,
        { image: newProfile },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      toast.success("Profile changed", {
        theme: "dark",
        autoClose: 2000,
        hideProgressBar: true,
      });
      setRefresh(true);
    } catch (error) {
      console.log(error);
    } finally {
      setNewProfile("");
    }
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="w-full h-full sm:w-2/3">
        <div className="text-[1.75rem] font-semibold p-4 pt-8 pl-6 text-white">
          Settings
        </div>
        <div className="flex w-full h-[25%]">
          <div className="flex items-center ml-6">
            <div className="avatar">
              <div className="rounded-full w-36 ring-primary ring-offset-base-100 ring ring-offset-2">
                <img src={user?.image ? user.image : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"}
                  className="hover:cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center ml-20">
            <div className="text-lg font-bold cursor-default">
              Your name
            </div>
            <div className="flex">
              <div className="mt-4 ml-1 text-lg w-96">
                {user?.name}
              </div>
              <div
                onClick={() => document.getElementById('my_modal_1').showModal()}
                className="p-1 w-12 btn btn-ghost rounded-full"
              >
                <HiPencil className="w-5 h-5" />
              </div>
            </div>
            <hr className="bg-gray-400 border-0 h-[2px] w-96" />
          </div>
          <div>
          </div>
        </div>
        <div className="ml-6 mt-8">
          <div className="mt-6 ml-1 mb-2 font-semibold">Change Profile</div>
          <form onSubmit={handleProfileChange}>
            <input
              type="file"
              className="file-input file-input-bordered file-input-md w-80"
              value={newProfile}
              onChange={convertToBase64}
            />
            <button className="btn btn-outline btn-primary ml-6">Submit</button>
          </form>
        </div>
        <div className="ml-6 mt-8">
          <div className="mt-6 ml-1 mb-2 font-semibold">Change Password</div>
          <form className="w-1/3 flex" onChange={handlePasswordChange}>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd" />
              </svg>
              <input
                type="password"
                className="grow w-[263px]"
                value={newPassword}
                placeholder="New password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
            <button className="btn btn-outline btn-primary ml-6">Submit</button>
          </form>
        </div>
        <div className="ml-6 mt-8">
          <div className="mt-6 ml-1 mb-2 font-semibold">Change Email</div>
          <form className="w-1/3 flex" onSubmit={handleEmailChange}>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path
                  d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="email"
                className="grow w-[263px]"
                placeholder="New email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </label>
            <button className="btn btn-outline btn-primary ml-6">Submit</button>
          </form>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full input input-bordered focus:border-none mt-5"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn mr-4 btn-ghost">Close</button>
              <button onClick={handleNameChange} className="btn">Submit</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default Settings