import React, { Component } from 'react';
import {
    Page,
    Grid,
    Media,
    Header,
    Card,
    List,
    Avatar,
    Button
} from "tabler-react";


class Home extends Component {
    render() {
        return (<Page>
            <Page.Header>
            </Page.Header>
            <Page.Content> 
                <Page.Card>
                    <div className="header-logo">
                        <img src="/logo.png" alt="solunited" />
                        <Header.H6>Power To You.</Header.H6>
                        <Header.H4>Sol-United is a B2C solution for Innogy where Innogy’s Customers are Producers and Consumers of Power.</Header.H4>
                        <Header.H5>Instructions:</Header.H5>
                        <List unstyled>
                            <List.Item>1. Install <a target="_blank" href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">MetaMask Chrome Extension</a></List.Item>
                            <List.Item>2. Click on Create Vault, add a Password and Login. Please remember your password :D </List.Item>
                            <List.Item>3. Select <b>Rinkeby Test Network</b> as shown in the screenshot and then click the button below - "View Dashboard"</List.Item>
                        </List>
                        <div className="img-container"><img className="screenshot" src="/images/screenshot.png" alt="screenshot" /></div>
                        <Header.H6><b>Disclaimer:</b> This network is just for testing purposes. The functionality and the transactions will still be the same in the final product.</Header.H6>
                        <Button
                            href="/dashboard"
                            outline
                            size="md"
                            RootComponent="a"
                            color="primary">
                        View Dashboard
                        </Button>
                    </div>
                </Page.Card>
                <Header.H2 className="center">What We Do?</Header.H2>
                <Grid.Row cards alignItems="center">
                    <Grid.Col md={4}>
                        <Card  className="minHeight">
                        <Card.Status color="yellow" side />
                        <Card.Body>
                            <Header.H4>Provide Innogy’s customers a hassle free technology to run their own solar panels with a simple set-up.</Header.H4>
                        </Card.Body>
                        </Card>
                    </Grid.Col>
                    <Grid.Col md={4}>
                        <Card  className="minHeight">
                        <Card.Status color="purple" side />
                        <Card.Body>
                            <Header.H4>An opportunity for the customers to make money by saving energy.</Header.H4>
                        </Card.Body>
                        </Card>
                    </Grid.Col>
                    <Grid.Col md={4}>
                        <Card  className="minHeight">
                        <Card.Status color="blue" side />
                        <Card.Body>
                            <Header.H4>A disruptive technology that creates a new revenue stream for Innogy.</Header.H4>
                        </Card.Body>
                        </Card>
                    </Grid.Col>
                </Grid.Row>
                <Header.H2 className="center">Our Team</Header.H2>
                <Grid.Row>
                    <Grid.Col md={4} className="center">
                        <Card>
                            
                        <Card.Header><Card.Title className="center">Shiv Bidani</Card.Title></Card.Header>
                            <Card.Body>
                                <Avatar size="xxl" imageURL="/images/shiv.jpg" />
                                <div className="margin-10"><Button
                                    href="https://www.linkedin.com/in/shivbidani/"
                                    outline
                                    size="md"
                                    target="_blank"
                                    RootComponent="a"
                                    color="primary">
                                LinkedIn
                                </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Grid.Col>
                    <Grid.Col md={4} className="center">
                        <Card>
                            
                        <Card.Header><Card.Title className="center">Shubhang Arora</Card.Title></Card.Header>
                            <Card.Body>
                                <Avatar size="xxl" imageURL="/images/shubhang.jpg" />
                                <div className="margin-10"><Button
                                    href="https://www.linkedin.com/in/arorashubhang/"
                                    outline
                                    target="_blank"
                                    size="md"
                                    RootComponent="a"
                                    color="primary">
                                LinkedIn
                                </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Grid.Col>
                    <Grid.Col md={4} className="center">
                        <Card>
                            
                        <Card.Header><Card.Title  className="center">Rishi Raj</Card.Title></Card.Header>
                            <Card.Body>
                                <Avatar size="xxl" imageURL="/images/rishi.jpg" />
                                <div className="margin-10"><Button
                                    href="https://www.linkedin.com/in/rajrishime/"
                                    outline
                                    size="md"
                                    target="_blank"
                                    RootComponent="a"
                                    color="primary">
                                LinkedIn
                                </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Grid.Col>
                </Grid.Row>
            </Page.Content>
        </Page>
        );
    }
}



export default Home;