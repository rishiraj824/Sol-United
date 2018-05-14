// @flow

import React, { Component } from "react";
import "./App.css";
import web3 from "./web3";
import solar from "./solar";

import {
  Page,
  Grid,
  Card,
  Table,
  colors,
  StampCard,
  Header,
  StatsCard,
  ProgressCard
} from "tabler-react";

import C3Chart from "react-c3js";

import SiteWrapper from "./SiteWrapper";

class App extends Component {

state = {
    sellers: [],
    buyers: [],
    transactions: [],
    productions: [],
    consumptions: [],
    grossConsumed: 0,
    grossProduced: 0,
    lastConsumed: 0,
    lastProduced: 0,
    accounts: '',
    excess: false,
    deficit: false,
    grossPercentConsumed: 0,
    grossPercentProduced: 0,
    latestPercentConsumed: 0,
    latestPercentProduced: 0,
    profit: 0,
    grossProfit: 0
}

async componentDidMount() {
    const sellers = await solar.methods.getSellers().call();
    const buyers = await solar.methods.getBuyers().call();

    const excess = await solar.methods.excess(sellers.length).call();
    const deficit = await solar.methods.excess(sellers.length).call();

    const consumptions = await solar.methods.getConsumptions().call();
    const productions = await solar.methods.getProductions().call();
    const accounts = await web3.eth.getAccounts();
    console.log(productions);
    console.log(consumptions);
    let grossConsumed=0, grossProduced=0, lastConsumed = 0, lastProduced = 0, transactions = [];

    for(let i=0; i< consumptions.length;i++){
      // Calculate the Consumed and Produced gross 
      grossConsumed = grossConsumed + parseInt(consumptions[i]);
      lastConsumed = parseInt(consumptions[consumptions.length - 1]);

      grossProduced = grossProduced + parseInt(productions[i]);
      lastProduced = parseInt(productions[productions.length - 1]);

      transactions.push({
        transaction: Math.abs(productions[i]-consumptions[i]),
        seller: sellers[0],
        buyer: buyers[0]
      })

    }

    let grossPercentConsumed = (grossConsumed - lastConsumed)*100 / grossConsumed;
    let grossPercentProduced = (grossProduced - lastProduced)*100 / grossProduced;
    let latestPercentConsumed = (lastConsumed - consumptions[consumptions.length - 2]) * 100 / consumptions[consumptions.length - 2];
    let latestPercentProduced = (lastProduced - productions[productions.length - 2]) * 100 / productions[productions.length - 2];
    let profit = parseInt((lastProduced - lastConsumed) * 0.4);
    let grossProfit = parseInt((grossProduced - grossConsumed) * 0.4);

    this.setState({
      sellers: sellers,
      buyers: buyers,
      transactions: transactions,
      grossConsumed: grossConsumed,
      consumptions: consumptions,
      productions: productions,
      grossProduced: grossProduced,
      lastConsumed: lastConsumed,
      lastProduced: lastProduced,
      accounts: accounts[0],
      excess: excess,
      deficit: deficit,
      profit: profit,
      grossProfit: grossProfit,
      grossPercentConsumed: parseInt(grossPercentConsumed),
      grossPercentProduced: parseInt(grossPercentProduced),
      latestPercentConsumed: parseInt(latestPercentConsumed),
      latestPercentProduced: parseInt(latestPercentProduced)
    })
}

render(){
  const header = `Dashboard - Hello there! (Your Address ${this.state.accounts.slice(0,15)}...)`;
  return (
    <SiteWrapper>
      <Page.Content title={header}>
        <Header.H2>All Time Units (Produced by 6 Panels)</Header.H2>
        <Grid.Row cards={true}>
          <Grid.Col width={6} sm={3} lg={3}>
            <StatsCard layout={1} movement={this.state.grossPercentProduced} total={this.state.grossProduced} label="Gross Units Produced" />
          </Grid.Col>
          <Grid.Col width={6} sm={3} lg={3}>
            <StatsCard layout={1} movement={this.state.grossPercentConsumed} total={this.state.grossConsumed} label="Gross Units Consumed" />
          </Grid.Col>
          <Grid.Col width={6} sm={3} lg={3}>
            <StatsCard
              layout={1}
              movement={this.state.latestPercentProduced}
              total={this.state.lastProduced}
              label="Units Produced Yesterday"
            />
          </Grid.Col>
          <Grid.Col width={6} sm={3} lg={3}>
            <StatsCard
              layout={1}
              movement={this.state.latestPercentConsumed}
              total={this.state.lastConsumed}
              label="Units Consumed Yesterday"
            />
          </Grid.Col>
          <Grid.Col lg={12}>
            <Card>
              <Card.Header>
                <Card.Title>You Daily Transactions</Card.Title>
              </Card.Header>
              <C3Chart
                style={{ height: "10rem" }}
                data={{
                  columns: [
                    // each columns data
                    [
                      "data1",...this.state.productions
                    ],
                    [
                      "data2",...this.state.consumptions
                    ]
                  ],
                  type: "area", // default type of chart
                  groups: [["data1", "data2"]],
                  colors: {
                    data1: colors["blue"],
                    data2: colors["green"]
                  },
                  names: {
                    // name of each serie
                    data1: "Production",
                    data2: "Consumption",
                  },
                }}
                axis={{
                  y: {
                    padding: {
                      bottom: 0,
                    },
                    show: false,
                    tick: {
                      outer: false,
                    },
                  },
                  x: {
                    padding: {
                      left: 0,
                      right: 0,
                    },
                    show: false,
                  },
                }}
                legend={{
                  position: "inset",
                  padding: 0,
                  inset: {
                    anchor: "top-left",
                    x: 20,
                    y: 8,
                    step: 10,
                  },
                }}
                tooltip={{
                  format: {
                    title: function(x) {
                      return "";
                    },
                  },
                }}
                padding={{
                  bottom: 0,
                  left: -1,
                  right: -1,
                }}
                point={{
                  show: false,
                }}
              />
              <Table
                cards={true}
                striped={true}
                responsive={true}
                className="table-vcenter"
              >
                <Table.Header>
                  <Table.Row>
                    <Table.ColHeader>Seller</Table.ColHeader>
                    <Table.ColHeader>Buyer</Table.ColHeader>
                    <Table.ColHeader>Units Sold</Table.ColHeader>
                    <Table.ColHeader>Date</Table.ColHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.state.transactions && this.state.transactions.map((transaction,i)=>{
                    return <Table.Row key={i}>
                    <Table.Col alt={transaction.seller}>{transaction.seller}...</Table.Col>
                    <Table.Col alt={transaction.buyer}>{transaction.buyer}...</Table.Col>
                    <Table.Col>{transaction.transaction}</Table.Col>
                    <Table.Col>{++i+9}/05/18</Table.Col>
                  </Table.Row>
                  })}
                </Table.Body>
              </Table>
            </Card>
          </Grid.Col>
            <Grid.Col sm={6}>
              <ProgressCard
                header="Latest Profit (EUR)"
                content={this.state.profit}
                progressColor="green"
                progressWidth={54}
              />
            </Grid.Col>
            <Grid.Col sm={6}>
              <ProgressCard
                header="Gross Profit (EUR)"
                content={this.state.grossProfit}
                progressColor="green"
                progressWidth={74}
              />
          </Grid.Col>
          <Grid.Col sm={6} lg={4}>
            <StampCard
              color="blue"
              icon="dollar-sign"
              header={
                <a>
                  {this.state.transactions.length}
                  &nbsp;<small>Transactions</small>
                </a>
              }
            />
          </Grid.Col>
          <Grid.Col sm={6} lg={4}>
            <StampCard
              color="green"
              icon = "dollar-sign"
              header={
                <a>
                  {this.state.grossProduced - this.state.grossConsumed}
                 &nbsp;<small>Units Sold</small>
                </a>
              }
            />
          </Grid.Col>
          <Grid.Col sm={6} lg={4}>
            <StampCard
              color="red"
              icon="users"
              header={
                <a>
                  3
                  &nbsp;<small>Houses</small>
                </a>
              }
            />
          </Grid.Col>
        </Grid.Row>
      </Page.Content>
    </SiteWrapper>
  );
}
}

export default App;