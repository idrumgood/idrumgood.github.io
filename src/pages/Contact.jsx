const Contact = () => {
    return (
        <section id="contact" className="content-section text-center">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-offset-2">
                        <h2>Contact Me</h2>
                        <p>Feel free to email me with projects, feedback, or just to say hi!</p>
                        <p><a href="mailto:idrumgood+website@gmail.com">idrumgood@gmail.com</a></p>
                        <ul className="list-inline banner-social-buttons">
                            <li>
                                <a href="https://soundcloud.com/idrumgood" className="btn btn-default"><span
                                    className="network-name">Soundcloud</span></a>
                            </li>
                            <li>
                                <a href="https://github.com/idrumgood" className="btn btn-default"><span
                                    className="network-name">Github</span></a>
                            </li>
                            <li>
                                <a href="http://www.last.fm/user/idrumgood" className="btn btn-default"><span
                                    className="network-name">Last.fm</span></a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/brydrumgood/" className="btn btn-default"><span
                                    className="network-name">Instagram</span></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
