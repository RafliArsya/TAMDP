import React, { Component} from "react";
import axios from "axios";
import { Modal } from "antd";
import "antd/dist/antd.css";

class SplashScreen extends React.Component {
  render() {
    const style = {top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      position: 'fixed'};
      
    return (
      <img src={'./logo512.png'} style={style}/>
    );
  }
}

let timer = null;

export default class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      renderSplashscreen: true,
      renderHome: false,
      visible: false,
      results: [],
    };
  }
  
  componentWillUnmount() {
    clearTimeout(timer);
  }

  handleButton = (type) => {
    //alert(first_name);
    this.setState({
      renderHome: type,
    });
  };
  handleModal = (results) => {
    this.setState({
      visible: true,
      results: results,
    });
  };

  componentDidMount() {
    axios({
      method: "get",
      url: "https://api.npoint.io/056aaaab5ad6d07bb381",
    })
      .then((data) => {
        console.log(data.data);
        this.setState({
            listData: data.data.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
    timer = setTimeout(() => this.setState({
      renderSplashscreen: false,
      renderHome: true,
    }), 3000)
  }

  render() {
    if(this.state.renderSplashscreen)
      return <SplashScreen/>;
    else if(this.state.renderHome)
      return (
      <div>
        <div className="topnav">
            <button
                  onClick={() => this.setState({renderHome: false})}
                >Weapons</button>
            <button
                  class="active"
                  onClick={() => this.setState({renderHome: true})}
                >Contact</button>
        </div>
        <h2>
	        <p>Contact: Rafli</p>
        </h2>
      </div>
      );
    else
    return (
      <div>
         <div className="topnav">
            <button
                  class="active"
                  onClick={() => this.handleButton(false)}
                >Weapons</button>
            <button
                  onClick={() => this.handleButton(true)}
                >Contact</button>
          </div>
        <div>
          <center>
            <h1>List of Weapons</h1>
          </center>
          <Modal

            title={this.state.results.name}
            centered
            visible={this.state.visible}
            onOk={() => this.setState({ visible: false })}
            closable={false}
            cancelButtonProps={{ style: { display: 'none' } }}
            okText="RETURN"
            width={500}
          >
            <div style={{ textAlign: "center" }}>
              <center><table>
                <tr>
                  <td rowSpan="8"><img src={this.state.results.img_src} alt="weapon" width="128px"/></td>
                  <td>Category</td>
                  <td></td>
                  <td>{this.state.results.type}</td>
                </tr>
                <tr>
                  <td>Magazine</td>
                  <td></td>
                  <td>{this.state.results.mag}</td>
                </tr>
                <tr>
                  <td>Total Ammo</td>
                  <td></td>
                  <td>{this.state.results.ammo}</td>
                </tr>
                <tr>
                  <td>Damage</td>
                  <td></td>
                  <td>{this.state.results.dmg}</td>
                </tr>
                <tr>
                  <td>Rate of Fire</td>
                  <td></td>
                  <td>{this.state.results.rof}</td>
                </tr>
                <tr>
                  <td>Accuracy</td>
                  <td></td>
                  <td>{this.state.results.acc}</td>
                </tr>
                <tr>
                  <td>Stability</td>
                  <td></td>
                  <td>{this.state.results.stability}</td>
                </tr>
                <tr>
                  <td>Concealment</td>
                  <td></td>
                  <td>{this.state.results.concealment}</td>
                </tr>
              </table></center>
            </div>
          </Modal>
          <div class="row">
           {this.state.listData.map((results, index) => {
            return (
              <div class="card" key={results.id}>
                  <table>
                    <tr>
                      <td><img src={results.img_src} alt="weapon" width="128px"/></td>
                      <td>
                        <h4><b>{results.name}</b></h4>
                        <p>{results.type}</p>
                      </td>
                    </tr>
                  </table>
                <button
                  className="button"
                  onClick={() => this.handleModal(results)}
                >
                  More Stats
                </button>
              </div>
            );
          })} 
          </div>
        </div>
      </div>
    );
  }
}
