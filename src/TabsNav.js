var React      = require('react');
var Nav        = require('react-bootstrap').Nav;
var NavItem    = require('react-bootstrap').NavItem;
var Button     = require('react-bootstrap').Button;

var TabsStore  = require('./TabsStore');
var TabActions = require('./Actions');

var CloseButton = React.createClass({

    clickHandler: function(){
        TabActions.close(this.props.eventKey);
    },

    render: function(){
        return (
        <span className="tab-close-button" onClick={this.clickHandler}>
            <Button bsSize="xsmall" bsStyle="link">
                <span className="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>
            </Button>
        </span>
        );
    },
});

var TabsNav = React.createClass({

    getInitialState: function(){

        return {
            tabs:        TabsStore.getAll(),
            order:       TabsStore.order,
            selectedTab: TabsStore.selectedTab,
            colors:      this.getColors(),
        };
    },

    componentDidMount: function() {
        TabsStore.bind('change', this.listChanged);
        TabsStore.bind('connection-color-change', this.colorChangeHandler);
    },

    componentWillUnmount: function() {
        TabsStore.unbind('change', this.listChanged);
        TabsStore.unbind('connection-color-change', this.colorChangeHandler);
    },

    listChanged: function() {
        this.setState({
            tabs: TabsStore.getAll(),
            order: TabsStore.order,
            selectedTab: TabsStore.selectedTab,
        });
    },

    getColors: function(){
        var colors = {};
        for (item in TabsStore.order){
            var connstr         = TabsStore.getConnstr(item);
            var connectionColor = TabsStore.getConnectionColor(connstr);
            colors[connstr]     = connectionColor;
        }
        return colors;
    },

    colorChangeHandler: function(){
        this.setState({colors: this.getColors()});
    },

    selectHandler: function(key) {
        TabActions.select(key);
    },

    render: function(){
        var items = this.state.order;
        var tabs = this.state.tabs;
        var itemHtml = items.map( function(item) {

                var connstr         = TabsStore.getConnstr(item);
                var connectionColor = TabsStore.getConnectionColor(connstr);
                var color_circle    = <span className="connection-color-circle" style={{background: connectionColor}}> &nbsp; </span>

                var title = <span className="tab-title">
                    {tabs[item].getTitle()}
                </span>
                return <NavItem key={item} eventKey={item}>
                    {color_circle}
                    {title}
                    <CloseButton eventKey={item}/>
                </NavItem>;
            });

        return (
        <div className="tab-navigator">
        <Nav bsStyle="tabs" activeKey={this.state.selectedTab} onSelect={this.selectHandler}>
            {itemHtml}

            <NavItem eventKey={0}>+</NavItem>

        </Nav>
        </div>
        )
    },
})

module.exports = TabsNav;
