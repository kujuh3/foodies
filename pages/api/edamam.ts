export function getServerSideProps() {
    console.log(process.env.EDAMAM_APP_ID)
    return {
        props: { message: "Welcome to the About Page" },
    };
}