import React from "react";

const date = new Date();
const currentYear = date.getFullYear();

function Footer(){
    return (<footer>
    <p> Copyright {currentYear} @ Pragya Patel </p>
    </footer>);
}

export default Footer;