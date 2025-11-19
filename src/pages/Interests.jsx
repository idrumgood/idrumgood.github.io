const Interests = () => {
    return (
        <section id="interests" className="content-section text-center">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-offset-2">
                        <h2>What I'm Into</h2>
                        <div className="grid-2">
                            <div className="panel">
                                <div className="panel-heading">
                                    <h3>Reading</h3>
                                </div>
                                <div className="panel-body">
                                    Currently turning pages of "Dragons of Deceit" by Margaret Weis and Tracy Hickman
                                </div>
                            </div>
                            <div className="panel">
                                <div className="panel-heading">
                                    <h3>Watching</h3>
                                </div>
                                <div className="panel-body">
                                    Working my way through "Alone Season 10"
                                </div>
                            </div>
                            <div className="panel">
                                <div className="panel-heading">
                                    <h3>Playing</h3>
                                </div>
                                <div className="panel-body">
                                    Fighting machines in "ARC Raiders"
                                </div>
                            </div>
                            <div className="panel">
                                <div className="panel-heading">
                                    <h3>Listening</h3>
                                </div>
                                <div className="panel-body">
                                    On repeat: "Is It Now?" by Automatic
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Interests;
