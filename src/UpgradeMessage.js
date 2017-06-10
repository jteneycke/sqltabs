var React        = require('react');
var Modal        = require('react-bootstrap').Modal;
var Button       = require('react-bootstrap').Button;
var OverlayMixin = require('react-bootstrap').OverlayMixin;
var TabsStore    = require('./TabsStore');
var Shell        = require('electron').shell;

var UpgradeMessage = React.createClass({

    getInitialState: function(){
        return {hidden: true}
    },

    componentDidMount: function(){
        TabsStore.bind('new-version-available', this.newVersionHandler);
    },

    componentWillUnmount: function(){
        TabsStore.unbind('new-version-available', this.newVersionHandler);
    },

    newVersionHandler: function(){
        this.setState({
            hidden: false,
        });
    },

    hide: function(){
        this.setState({hidden: true});
    },

    render: function(){

        if (this.state.hidden){
            return <span refs=""/>;
        } else {

            return (
              <div className='static-modal'>

                <Modal.Dialog
                  bsStyle='primary'
                  backdrop={false}
                  animation={false}
                  container={document.body}
                  onRequestHide={this.hide}
                  onRequestEnter={this.enter}
                  >

                  <Modal.Body>
                    <table className="about-table"><tr>
                    <td><img className="about-logo" src="logo.png"/></td>
                    <td> <p> SQL Tabs v{TabsStore.newVersion.join('.')} is available for <a href="#" onClick={function(){Shell.openExternal('http://www.sqltabs.com');}}>download</a></p>
                    </td>
                    </tr></table>

                  </Modal.Body>
                  <Modal.Footer>
                     <Button onClick={this.hide}>OK</Button>
                  </Modal.Footer>

                </Modal.Dialog>
              </div>
            );
        }
    },
});

module.exports = UpgradeMessage;
