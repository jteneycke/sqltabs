var React       = require('react');
var Actions     = require('./Actions');
var TabsStore   = require('./TabsStore');
var ConnInput   = require('./ConnInput');
var ColorPicker = require('react-color').CirclePicker;

var TabToolbar = React.createClass({

    getInitialState: function(){
        var color = TabsStore.getConnectionColor();
        return {
            background: color,
            displayColorPicker: false,
        };

    },

    componentDidMount: function(){
        TabsStore.bind('change', this.storeChangedHandler);
        var color = TabsStore.getConnectionColor();
    },

    componentWillUnmount: function(){
        TabsStore.unbind('change', this.storeChangedHandler);
    },

    storeChangedHandler: function(){
        var color = TabsStore.getConnectionColor();
        this.setState({background: color});
    },

    toggleProject: function(){
        Actions.toggleProject();
    },

    toggleTheme: function(){
        if (TabsStore.theme == 'dark'){
            Actions.setTheme('bright');
        } else {
            Actions.setTheme('dark');
        }
    },

    toggleColorPicker: function(){
        this.setState({displayColorPicker: !this.state.displayColorPicker});
    },

    clearColor: function(){
        this.setState({background: 'inherit', displayColorPicker: false});
        TabsStore.saveConnectionColor(null);
        Actions.connectionColorChange();
    },

    colorChangeHandler: function(color){
        if (color == null){
            this.setState({background: 'inherit', displayColorPicker: false});
            TabsStore.saveConnectionColor(color);
        } else {
            this.setState({background: color.hex, displayColorPicker: false});
            TabsStore.saveConnectionColor(color.hex);
        }
        Actions.connectionColorChange();
    },

    render: function(){

        if (this.state.displayColorPicker){
            var color_picker = <div className="color-picker" id="color-picker">
              <ColorPicker color={ this.state.background } onChange={ this.colorChangeHandler} />
              <div className="clear-color" onClick={this.clearColor}> Clear </div>
            </div>;
        } else {
            var color_picker = null;
        }

        return (
        <div className="tab-toolbar" style={{background: this.state.background}}>
            <div className="toolbar-button" onClick={this.toggleProject}><span className="glyphicon glyphicon-menu-hamburger"/></div>
            <ConnInput eventKey={this.props.eventKey}/>
            <div className="toggle-theme-button" onClick={this.toggleTheme}><span className="glyphicon glyphicon-adjust"/></div>
            <div className="conn-color-button" onClick={this.toggleColorPicker}><span className="glyphicon glyphicon-tint"/></div>
            {color_picker}
        </div>
        );
    },

});

module.exports = TabToolbar;
