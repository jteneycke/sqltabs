var React         = require('react');
var TabsStore     = require('./TabsStore');
var TabActions    = require('./Actions');
var OutputConsole = require('./OutputConsole');
var TabSplit      = require('./TabSplit');
var Editor        = require('./Editor');
var TabToolbar    = require('./TabToolbar');
var SearchBox     = require('./SearchBox');
var Settings      = require('./Settings');
var Project       = require('./Project');

var TabContent = React.createClass({

    getInitialState: function(){
        return {
            theme: TabsStore.theme,
            project: false,
        };
    },

    componentDidMount: function() {
        TabsStore.bind('change-theme', this.storeChangedHandler);
    },

    componentWillUnmount: function() {
        TabsStore.unbind('change-theme', this.storeChangedHandler);
    },

    storeChangedHandler: function(){
        this.setState({
            theme: TabsStore.theme
        });
    },

    render: function(){

        var cls = (this.props.visible) ? 'tab-content': 'tab-content hidden';
        var isSettings = TabsStore.getConnstr(this.props.eventKey) === 'about:settings'

        if (isSettings) {
            return (

              <div className={cls}>
                  <Settings />
              </div>
            )
        }

        return (

            <div className={cls}>

                <TabToolbar eventKey={this.props.eventKey}/>

                <div className="tab-content-without-toolbar">
                    <TabSplit eventKey={this.props.eventKey} type="vertical" project="true">

                        <Project eventKey={this.props.eventKey}/>

                        <TabSplit key={"tab-content-inner-"+this.props.eventKey} eventKey={this.props.eventKey}>

                            <Editor name={'editor-'+this.props.eventKey} theme={this.state.theme} eventKey={this.props.eventKey}/>

                            <OutputConsole eventKey={this.props.eventKey}/>

                        </TabSplit>
                    </TabSplit>
                </div>

                <SearchBox eventKey={this.props.eventKey}/>

            </div>
        );

    }
});

module.exports = TabContent;
