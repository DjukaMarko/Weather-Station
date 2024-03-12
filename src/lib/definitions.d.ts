// definitions.d.ts

// Define the User type
type User = {
    id: number;
    email: string;
    password: string;
    // Add more properties as needed
};

type MobilePropTypes = {
    isHovered: boolean,
    isSigningOut: boolean,
    handleSignOut: () => void,
    handleHover: () => void,
}

interface MTypes extends MobilePropTypes {
    isClicked: boolean,
    setClicked:React.Dispatch<React.SetStateAction<boolean>>
}

// Export the User type so it can be used in other files
export { User, MobilePropTypes, MTypes };
