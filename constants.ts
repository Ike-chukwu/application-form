const options = [
    {
        id: 0,
        title: "Text me",
        imgUrl: "/text-message-phone-smartphone-svgrepo-com.png"
    },
    {
        id: 1,
        title: "Call me",
        imgUrl: "/text-message-phone-smartphone-svgrepo-com.png"
    }
]

export const LoginSetupSteps = [
    { label: "Login USer", step: "1" },
    { label: "Verify Number", step: "2" },
    { label: "Enter Code", step: "3" },
    // { label: "Confirmation", step: "4" },
];

export const AccountSetupSteps = [
    { label: "Personal Info", step: "1" },
    { label: "Id Details", step: "2" },
    { label: "Verification", step: "3" },
    // { label: "Confirmation", step: "4" },
];

export const getImageName = (url: string) => {
    return url?.split("/")?.pop()?.split("-")[0];
};