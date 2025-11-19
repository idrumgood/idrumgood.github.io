const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <div className="container text-center">
                <p>Copyright &copy; Bryan Dunk <span id="copyrightDate">{currentYear}</span></p>
            </div>
        </footer>
    );
};

export default Footer;
