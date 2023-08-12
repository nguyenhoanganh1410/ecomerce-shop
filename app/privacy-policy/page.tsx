import BlockPolicyComponent from "@/components/privacy-policy/block-policy";
import {
  privacy_policy_contact_us,
  privacy_policy_disclosure_of_data,
  privacy_policy_security_of_data,
  privacy_policy_service_providers,
  privacy_policy_transfer_of_data,
  privacy_policy_use_of_data,
} from "@/utils/data";
import Image from "next/image";
import React from "react";

export default async function PrivacyPolicyPage() {
  return (
    <React.Fragment>
      <p className="text-base font-normal text-[#868E96] mt-10 md:mt-20  mb-4 md:mb-8">
        Varkala (us, we, or our) operates the https://example.com website (the
        Service).
      </p>
      <p className="text-base font-normal text-[#868E96] mb-4 md:mb-8">
        EThis page informs you of our policies regarding the collection, use,
        and disclosure of personal data when you use our Service and the choices
        you have associated with that data. Our Privacy Policy for Varkala is
        created with the help of the{" "}
        <a href="#" className="text-[#BCAC76]">
          Free Privacy Policy Generator
        </a>
        .
      </p>
      <p className="text-base font-normal text-[#868E96] mb-4 md:mb-8">
        We use your data to provide and improve the Service. By using the
        Service, you agree to the collection and use of information in
        accordance with this policy. Unless otherwise defined in this Privacy
        Policy, terms used in this Privacy Policy have the same meanings as in
        our Terms and Conditions, accessible from https://example.com
      </p>
      <h3 className="text-2xl font-bold tracking-tight text-[#212529] sm:text-[30px] mb-4 md:mb-8">
        Information Collection And Use
      </h3>
      <p className="text-base font-normal text-[#868E96] mb-4 md:mb-8">
        We collect several different types of information for various purposes
        to provide and improve our Service to you.
      </p>

      <div className="h-[1px] w-full bg-[#212529] opacity-25 mb-4 md:mb-8"></div>
      <h4 className="text-xl font-bold tracking-tight text-[#212529] sm:text-[26px] mb-4 md:mb-8 ">
        Types of Data Collected
      </h4>
      <h5 className="text-lg font-bold tracking-tight text-[#212529] sm:text-[23px] mb-4 md:mb-8">
        Personal Data
      </h5>
      <div className="flex items-center">
        <div className="relative w-[30px] h-[30px] cursor-pointer hover:opacity-55">
          <Image
            src="/arrow-right-gold.png"
            width={30}
            height={30}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>
        <p className="text-base font-normal text-[#868E96]">Email address</p>
      </div>
      <div className="flex items-center mb-4 md:mb-8">
        <div className="relative w-[30px] h-[30px] cursor-pointer hover:opacity-55">
          <Image
            src="/arrow-right-gold.png"
            width={30}
            height={30}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>
        <p className="text-base font-normal text-[#868E96]">
          Cookies and Usage Data
        </p>
      </div>
      <p className="text-base font-normal text-[#868E96] mb-4 md:mb-8">
        While using our Service, we may ask you to provide us with certain
        personally identifiable information that can be used to contact or
        identify you (Personal Data). Personally identifiable information may
        include, but is not limited to:
      </p>
      <h5 className="text-lg font-bold tracking-tight text-[#212529] sm:text-[23px] mb-4 md:mb-8">
        Usage Data
      </h5>
      <p className="text-base font-normal text-[#868E96] mb-4 md:mb-8">
        We may also collect information how the Service is accessed and used
        (Usage Data). This Usage Data may include information such as your
        computers Internet Protocol address (e.g. IP address), browser type,
        browser version, the pages of our Service that you visit, the time and
        date of your visit, the time spent on those pages, unique device
        identifiers and other diagnostic data.
      </p>
      <h5 className="text-lg font-bold tracking-tight text-[#212529] sm:text-[23px] mb-4 md:mb-8">
        Tracking & Cookies Data
      </h5>
      <p className="text-base font-normal text-[#868E96] mb-4 md:mb-8">
        We use cookies and similar tracking technologies to track the activity
        on our Service and hold certain information.
      </p>
      <p className="text-base font-normal text-[#868E96] mb-4 md:mb-8">
        Cookies are files with small amount of data which may include an
        anonymous unique identifier. Cookies are sent to your browser from a
        website and stored on your device. Tracking technologies also used are
        beacons, tags, and scripts to collect and track information and to
        improve and analyze our Service.
      </p>
      <p className="text-base font-normal text-[#868E96] mb-4 md:mb-8">
        You can instruct your browser to refuse all cookies or to indicate when
        a cookie is being sent. However, if you do not accept cookies, you may
        not be able to use some portions of our Service.
      </p>
      <p className="text-base font-normal text-[#868E96] mb-4 md:mb-8">
        Examples of Cookies we use:
      </p>
      <div className="flex items-center">
        <div className="relative w-[30px] h-[30px] cursor-pointer hover:opacity-55">
          <Image
            src="/arrow-right-gold.png"
            width={30}
            height={30}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <p className="text-base font-normal text-[#868E96] w-fit">
          <a href="#" className="text-[#868E96] mr-1 font-bold">
            Session Cookies.
          </a>
          We use Session Cookies to operate our Service.
        </p>
      </div>
      <div className="flex items-center">
        <div className="relative w-[30px] h-[30px] cursor-pointer hover:opacity-55">
          <Image
            src="/arrow-right-gold.png"
            width={30}
            height={30}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>
        <p className="text-base font-normal text-[#868E96] w-fit">
          <a href="#" className="text-[#868E96] mr-1 font-bold">
            Preference Cookies.
          </a>
          We use Preference Cookies to remember your preferences and various
          settings.
        </p>
      </div>
      <div className="flex items-center mb-4 md:mb-8">
        <div className="relative w-[30px] h-[30px] cursor-pointer hover:opacity-55">
          <Image
            src="/arrow-right-gold.png"
            width={30}
            height={30}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>
        <p className="text-base font-normal text-[#868E96] w-fit">
          <a href="#" className="text-[#868E96] mr-1 font-bold">
            Security Cookies.
          </a>
          We use Security Cookies for security purposes.
        </p>
      </div>
      <div className="h-[1px] w-full bg-[#212529] opacity-25 mb-4 md:mb-8"></div>

      <BlockPolicyComponent 
        block={privacy_policy_use_of_data} 
        hasLine={true} 
      />
      <BlockPolicyComponent
        block={privacy_policy_transfer_of_data}
        hasLine={true}
      />
      <BlockPolicyComponent
        block={privacy_policy_disclosure_of_data}
        hasLine={true}
      />
      <BlockPolicyComponent
        block={privacy_policy_security_of_data}
        hasLine={true}
      />
      <BlockPolicyComponent
        block={privacy_policy_service_providers}
        hasLine={true}
      />
      <BlockPolicyComponent block={privacy_policy_contact_us} />
    </React.Fragment>
  );
}
