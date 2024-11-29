import Navigation from "../navigation/navigation";

const Header = () => {
    return (
        <div style={{display:"flex"}}>
            <div style={{paddingTop:"2%",paddingLeft:"1%"}}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Logo_of_VinFast_%283D%29.svg" width="75" alt="logo"/>
            </div>
            <Navigation/>
        </div>
    )
}

export default Header;