// @flow

import * as React from "react";

import {
  Page,
  Site,
  Nav,
  Grid,
  Button
} from "tabler-react";

type Props = {|
  +children: React.Node,
|};

type navItem = {|
  +value: string,
  +to?: string,
  +icon?: string,
  +subItems?: Array<navItem>,
|};

const navBarItems: Array<navItem> = [
  { value: "Home", to: "/", icon: "home" },
];

class SiteWrapper extends React.Component<Props, void> {
  render(): React.Node {
    return (
      <Page>
        <Page.Main>
          <Site.Header>
            <Site.Logo
              href={"/"}
              alt="SolUnited"
              src="/logo.png"
            />
            <div className="d-flex order-lg-2 ml-auto">
              <Nav.Item type="div" className="d-none d-md-flex">
                <Button
                  href="https://github.com/rishiraj824/innogy-hack"
                  target="_blank"
                  outline
                  size="sm"
                  RootComponent="a"
                  color="primary"
                >
                  View Github
                </Button>
              </Nav.Item>

            </div>
            <a
              className="header-toggler d-lg-none ml-3 ml-lg-0"
              data-toggle="collapse"
              data-target="#headerMenuCollapse"
            >
              <span className="header-toggler-icon" />
            </a>
          </Site.Header>
          <Site.Nav>
            <Grid.Row className="align-items-center">
              <Grid.Col className="col-lg order-lg-first">
                <Nav tabbed className="border-0 flex-column flex-lg-row">
                  {navBarItems.map((a, ai) => (
                    <Nav.Item
                      key={ai}
                      icon={a.icon}
                      value={a.value}
                      to={a.to}
                      hasSubNav={!!a.subItems}
                    >
                      {a.subItems &&
                        a.subItems.map((b, bi) => (
                          <Nav.SubItem
                            key={bi}
                            value={b.value}
                            to={b.to}
                            icon={b.icon}
                          />
                        ))}
                    </Nav.Item>
                  ))}
                  <Nav.Item
                    icon="file-text"
                    value="View Source of Frontend"
                    to="https://github.com/rishiraj824/innogy-hack"
                  />
                  <Nav.Item
                    icon="file-text"
                    value="View Source of Frontend"
                    to="https://github.com/shubhang-arora/Sol-United"
                  />
                </Nav>
              </Grid.Col>
            </Grid.Row>
          </Site.Nav>
          {this.props.children}
        </Page.Main>
      </Page>
    );
  }
}

export default SiteWrapper;
