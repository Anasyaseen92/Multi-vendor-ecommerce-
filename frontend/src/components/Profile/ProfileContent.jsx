
import { AiOutlineCamera } from "react-icons/ai";
import { backend_url } from "../../../server";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import { useState } from "react";
function ProfileContent() {
  const [active , setActive] = useState(1);
  const {user} = useSelector((state) => state.user);
  const [name , setName] = useState(user && user.name);
  const [email , setEmail] = useState(user && user.email); 
  const [phone , setPhoneNumber] = useState("");
  const [zipCode , setZipCode] = useState("");
  const [address1 , setAddress1] = useState("");
  const [address2 , setAddress2] = useState("");

  const handleSubmit = () =>{
    e.prevent();
  }
  return (
    <div className="w-full min-h-screen">
      {active === 1 && (
        <>
        <div className="flex justify-center w-full">
          <div className="relative">
            <img
              className="rounded-full w-[150px] h-[150px] object-cover border-[3px] border-blue-700"
              src={`${backend_url}/${user?.avatar}`}
              alt=""
            />
            <div className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
              <AiOutlineCamera/>
            </div> 
          </div>
        </div>
        <br/>
         
        <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                 <label className="block pb-2">Full Name</label>
                 <input
                 type="text"
                 className={`${styles.input} !w-[95%]`}
                 required
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 />
                </div>

                {/* Email */}

                 <div className="w-[50%]">
                 <label className="block pb-2">Email Address</label>
                 <input
                 type="text"
                 className={`${styles.input} !w-[95%]`}
                 required
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 />
                </div>
              </div>

              {/* 2nd hai boss */}

              <div className="w-full flex pb-3">
                

                {/* Phone Number */}

                 <div className="w-[50%]">
                 <label className="block pb-2">Phone Number</label>
                 <input
                 type="number"
                 className={`${styles.input} !w-[95%]`}
                 required
                 value={phone}
                 onChange={(e) => setPhoneNumber(e.target.value)}
                 />
                </div>
               
               {/* Zip Code */}

                <div className="w-[50%]">
                 <label className="block pb-2">Zip Code</label>
                 <input
                 type="number"
                 className={`${styles.input} !w-[95%]`}
                 required
                 value={zipCode}
                 onChange={(e) => setZipCode(e.target.value)}
                 />
                </div>

                 
              </div>

              {/* 3rd hai boss */}

              <div className="w-full flex pb-3">
                

                {/* Phone Number */}

                 <div className="w-[50%]">
                 <label className="block pb-2">Address 1</label>
                 <input
                 type="text"
                 className={`${styles.input} !w-[95%]`}
                 required
                 value={address1}
                 onChange={(e) => setAddress1(e.target.value)}
                 />
                </div>
               
               {/* Zip Code */}

                <div className="w-[50%]">
                 <label className="block pb-2">Address 2</label>
                 <input
                 type="text"
                 className={`${styles.input} !w-[95%]`}
                 required
                 value={address2}
                 onChange={(e) => setAddress2(e.target.value)}
                 />
                </div>
              </div>
              <div className="flex justify-center">
              <input
              required
              value="Update"
              type="submit"
              className={`w-[250px] bg-blue-600 h-[40px] border border-[#000000] text-center cursor-pointer text-white rounded-[3px] mt-8` }
              />
              </div>
            </form>
          </div>  
        </>
      )}
    </div>
  );
}

export default ProfileContent;
