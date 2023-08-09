import Image from "next/image";
import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { getProvinceData } from "@/lib/getProvince";
import axios from "axios";
import swal from 'sweetalert';
const provinceApi = "https://vapi.vnappmob.com/api/province";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function HomePage() {
  const [province, setProvince] = useState([]);
  const [selected, setSelected] = useState();
  const [district, setDistrict] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [ward, setWard] = useState([]);
  const [selectedWard, setSelectedWard] = useState([]);
  const [referralCode, setReferralCode] = useState([]);
  const [combo, setCombo] = useState(0)
  const [name, setName] = useState("");
   const [phone, setPhone] = useState("");
  const [identityCard, setIdentityCard] = useState("")
  const [street, setStreet] = useState("")
  const getProvinceData = async () => {
    try {
      const res = await axios.get(`${provinceApi}`);
      if (res.status === 200) {
        setProvince(res.data.results);
      } else {
        setProvince([]);
      }
    } catch (e) {
      console.log(e);
    }
  };
   const getDistrictData = async (province_id) => {
     try {
       const res = await axios.get(
         `${provinceApi}/district/${province_id}`
       );
       console.log(res);
       if (res.status === 200) {
         setDistrict(res.data.results);
       } else {
         setDistrict([]);
       }
     } catch (e) {
       console.log(e);
     }
   };
   const getWardData = async (district_id) => {
     try {
       const res = await axios.get(`${provinceApi}/ward/${district_id}`);
       if (res.status === 200) {
         setWard(res.data.results);
       } else {
         setWard([]);
       }
     } catch (e) {
       console.log(e);
     }
   };
   const postData = async (e) => {
    e.preventDefault();
    const data = {
          ma_gio_thieu: referralCode,
           name: name || "",
           phone: phone || "",
           cmnd: identityCard || "",
           combo: combo,
           trang_thai: "0",
           tinh_thanh: selected?.province_name || "",
           quan_huyen: selectedDistrict?.district_name || "",
           phuong_xa: selectedWard?.ward_name,
           address: street || "",
         }
         console.log(data)
    if(selected && selectedDistrict && selectedWard){
       try {
         const res = await axios.post(
           `https://api.fostech.vn/api/625df20a02f00e19239e8b89/ordercombo?access_token=flex.public.token`,
           data
         );
         if (res.status === 200) {
          
           swal(
             "success",
             {
              title: "Đặt hàng thành công",
              text: "Chúc mừng bạn đã đặt hàng thành công",
            }
            
           );
         } else {
           swal(
             "Đặt hàng thất bại",
             "Xin lỗi bạn dã đặt hàng thất bại. Vui lòng kiểm tra lại thông tin",
             "error"
           );
         }
       } catch (e) {
         console.log(e);
       }
    }else if(combo == 0){
       swal(
         "Lỗi",
         "Bạn chưa chọn combo",
         "error"
       );
    } else{
       swal(
         "Lỗi",
         "Bạn chưa chọn địa chỉ. Vui lòng chọn đầy đủ điện chỉ tỉnh/thành phố, quân/huyện, phường/xã",
         "error"
       );
    }
   }

  useEffect(() => {
    getProvinceData();
    getDistrictData(selected?.province_id);
    getWardData(selectedDistrict?.district_id)
  }, [selected, selectedDistrict]);
  console.log(name);
  return (
    <div className="">
      <div className="grid grid-cols-2 gap-x-2">
        <Image
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "100%",
            height: "100%",
          }}
          className={combo === 1 && "border-2 border-indigo-600"}
          onClick={() => setCombo(1)}
          src="/image/z4588314820873_c815add35fb557ce37c31933a73a2ae8.jpg"
        />
        <Image
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className={combo === 2 && "border-2 border-indigo-600"}
          style={{
            width: "100%",
            height: "100%",
          }}
          onClick={() => setCombo(2)}
          src="/image/z4588314844212_746cf22df832290561939775f8ca9496.jpg"
        />
      </div>
      <form
        class="mt-10"
        onSubmit={(e) => {
          postData(e);
        }}
      >
        <div className="my-3">
          <input
            id="referralCode"
            name="referralCode"
            type="text"
            placeholder="Mã giới thiệu"
            // autoComplete="email"
            onChange={(e) => setReferralCode(e.target.value)}
            required
            className="block w-full rounded-md border-0 px-6 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2  focus:outline-0focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="my-3">
          <input
            id="combo"
            name="combo"
            type="text"
            // autoComplete="email"
            placeholder="Combo đã chọn"
            value={combo > 0 ? `Đã chọn combo ${combo}` : ""}
            onClick={() =>
              swal({
                title: "Lỗi",
                text: "Vui lòng ấn chọn vào hình của combo để chọn combo muốn đặt",
                icon: "info",
              })
            }
            readOnly
            className="block w-full rounded-md border-0 px-6 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="my-3">
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Tên của bạn"
            required
            className="block w-full rounded-md border-0 px-6 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="my-3">
          <input
            id="phone"
            name="phone"
            type="text"
            autoComplete="phone"
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Số điện thoại"
            required
            className="block w-full rounded-md border-0 px-6 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="my-3">
          <input
            id="identityCard"
            name="identityCard"
            type="text"
            // autoComplete="email"
            onChange={(e) => setIdentityCard(e.target.value)}
            placeholder="Chứng minh nhân dân"
            required
            className="block w-full rounded-md border-0 px-6 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <Listbox value={selected} onChange={setSelected}>
          {({ open }) => (
            <>
              <div className="relative my-3">
                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-2.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                  {selected ? (
                    <span className="ml-3 block truncate">
                      {selected?.province_name}
                    </span>
                  ) : (
                    <span className="ml-3 block truncate text-gray-500">
                      Chọn tỉnh/thành phố
                    </span>
                  )}
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-500"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {province.map((item) => (
                      <Listbox.Option
                        key={item.province_id}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "bg-indigo-600 text-white"
                              : "text-gray-900",
                            "relative cursor-default select-none py-2 pl-3 pr-9"
                          )
                        }
                        value={item}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "ml-3 block truncate"
                                )}
                              >
                                {item.province_name}
                              </span>
                            </div>

                            {selected?.province_id === item.province_id ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-indigo-600",
                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
        <Listbox value={selectedDistrict} onChange={setSelectedDistrict}>
          {({ open }) => (
            <>
              <div className="relative my-3">
                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-2.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                  <span
                    className={`ml-3 block truncate ${
                      !selectedDistrict && "text-gray-500"
                    }`}
                  >
                    {selectedDistrict?.district_name || "Chọn quận/huyện"}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-500"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {district.length > 0 ? (
                      district.map((item) => (
                        <Listbox.Option
                          key={item.district_id}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "bg-indigo-600 text-white"
                                : "text-gray-900",
                              "relative cursor-default select-none py-2 pl-3 pr-9"
                            )
                          }
                          value={item}
                        >
                          {({ selected, active }) => (
                            <>
                              <div className="flex items-center">
                                <span
                                  className={classNames(
                                    selected ? "font-semibold" : "font-normal",
                                    "ml-3 block truncate"
                                  )}
                                >
                                  {item.district_name}
                                </span>
                              </div>
                              {selectedDistrict?.district_id ===
                              item.district_id ? (
                                <span
                                  className={classNames(
                                    active ? "text-white" : "text-indigo-600",
                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))
                    ) : (
                      <Listbox.Option className="relative cursor-default select-none py-2 pl-3 pr-9">
                        Bạn chưa chọn tỉnh/thành phố
                      </Listbox.Option>
                    )}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
        <Listbox value={selectedWard} onChange={setSelectedWard}>
          {({ open }) => (
            <>
              <div className="relative my-3">
                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-2.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                  <span
                    className={`ml-3 block truncate ${
                      !selectedWard && "text-gray-500"
                    }`}
                  >
                    {selectedWard?.ward_name || "Chọn phường/xã"}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-500"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {ward.length > 0 ? (
                      ward.map((item) => (
                        <Listbox.Option
                          key={item.ward_id}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "bg-indigo-600 text-white"
                                : "text-gray-900",
                              "relative cursor-default select-none py-2 pl-3 pr-9"
                            )
                          }
                          value={item}
                        >
                          {({ selected, active }) => (
                            <>
                              <div className="flex items-center">
                                <span
                                  className={classNames(
                                    selected ? "font-semibold" : "font-normal",
                                    "ml-3 block truncate"
                                  )}
                                >
                                  {item.ward_name}
                                </span>
                              </div>
                              {selectedWard?.ward_id === item.ward_id ? (
                                <span
                                  className={classNames(
                                    active ? "text-white" : "text-indigo-600",
                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))
                    ) : (
                      <Listbox.Option className="relative cursor-default select-none py-2 pl-3 pr-9">
                        Bạn chưa chọn quận/huyện
                      </Listbox.Option>
                    )}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
        <div className="my-3">
          <input
            id="street"
            name="street"
            type="text"
            // autoComplete="email"
            onChange={(e) => setStreet(e.target.value)}
            placeholder="Tên đường"
            required
            className="block w-full rounded-md border-0 px-6 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <button
          type="submit"
          className="my-3 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          XÁC NHẬN ĐẶT HÀNG
        </button>
      </form>
    </div>
  );
}
