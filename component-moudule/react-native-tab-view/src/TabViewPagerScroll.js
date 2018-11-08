/* @flow */

import * as React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { PagerRendererPropType } from './TabViewPropTypes';
import type { PagerRendererProps } from './TabViewTypeDefinitions';
import * as TD from "react-native-talkingdata";
import {StackPages} from "react-navigation";

type ScrollEvent = {
    nativeEvent: {
        contentOffset: {
            x: number,
            y: number,
        },
    },
};

type State = {|
    initialOffset: {| x: number, y: number |},
|};

type Props<T> = PagerRendererProps<T>;

export default class TabViewPagerScroll<T: *> extends React.Component<
    Props<T>,
    State
    > {
    static propTypes = PagerRendererPropType;

    static defaultProps = {
        canJumpToTab: () => true,
    };

    constructor(props: Props<T>) {
        super(props);

        const { navigationState, layout } = this.props;

        this.state = {
            initialOffset: {
                x: navigationState.index * layout.width,
                y: 0,
            },
        };
    }

    componentDidMount() {
        this._setInitialPage();
    }

    componentDidUpdate(prevProps: Props<T>) {
        if (
            prevProps.layout.width !== this.props.layout.width ||
            prevProps.navigationState !== this.props.navigationState
        ) {

            // console.info("this.props.navigationState:"  + "",this.props.navigationState);

            this._scrollTo(
                this.props.navigationState.index * this.props.layout.width,
                prevProps.layout.width === this.props.layout.width
            );
        }
        else {

        }
    }

    _scrollView: ?ScrollView;
    _idleCallback: any;
    _isIdle: boolean = true;
    _isInitial: boolean = true;

    _setInitialPage = () => {
        if (this.props.layout.width) {
            this._isInitial = true;
            this._scrollTo(
                this.props.navigationState.index * this.props.layout.width,
                false
            );
        }

        setTimeout(() => {
            this._isInitial = false;
        }, 50);
    };

    _scrollTo = (x: number, animated) => {
        if (this._isIdle && this._scrollView) {

            this._scrollView.scrollTo({
                x,
                animated: animated && this.props.animationEnabled !== false,
            });
        }
    };

    getRoutes(nav,index){
        if(nav.routes && nav.routes.length > 0){
            return this.getRoutes(nav.routes[nav.index]);
            // return this.getRoutes(nav.routes[index],nav.routes[index].index);
        }
        else
        {
            return nav;
        }
    }

    navState = null;
    //执行生命周期 componentWillEnter componentWillExit
    componentEnter(){
        let nav = JSON.stringify(this.props.navigationState);
        StackPages.stackPagesStruct = this.props.navigationState;
        nav = JSON.parse(nav);
        nav.index = this._curIndex;
        let curState = this.getRoutes(nav,this._curIndex);
        if(!this.navState || this.navState.routeName != curState.routeName){

            this.navState = curState;

            StackPages.componentWillExit();
            StackPages.componentWillEnter(this.navState.routeName,this.navState.params
                ? this.navState.params.params
                    ? this.navState.params.params
                    : {}
                : {});

            /*if(StackPages.stackPagesHistory.length > 0){

                let page = StackPages.stackPagesHistory[StackPages.stackPagesHistory.length - 1];

                TD.trackPageEnd(page.routeName);

                let clsPre = StackPages.stackPages[page.routeName].screen.prototype;;
                if(clsPre.context){
                    // clsPre.context.componentWillExit&&clsPre.context.componentWillExit.bind(clsPre.context);
                    clsPre.context.componentWillExit&&clsPre.context.componentWillExit(
                        page.params,
                        page.action,
                        page.routeName);
                }
            }*/

            /*let cls = StackPages.stackPages[this.navState.routeName].screen.prototype;

            if(cls.context){
                StackPages.curPageState = this.navState.params
                    ? this.navState.params.params
                        ? this.navState.params.params
                        : {}
                    : {};
                StackPages.curPageState.routeName = this.navState.routeName;
                TD.trackPageBegin(this.navState.routeName);

                // cls.context.componentWillEnter&&cls.context.componentWillEnter.bind(cls.context);
                //第二个参数是否返回，true进入，false： 返回
                cls.context.componentWillEnter&&cls.context.componentWillEnter(
                    StackPages.curPageState.params,
                    StackPages.curPageState.action,
                    StackPages.curPageState.routeName);

                StackPages.stackPagesHistory.push(StackPages.curPageState);
                // StackPages.curPageState.isExe = true;
            }*/

            // console.info("this.navState:", this.navState);
            // console.info("StackPages.curPageState:", StackPages.curPageState);
        }

        // console.info("nav:", nav);
    }

    _curIndex = 0;
    _handleMomentumScrollEnd = (e: ScrollEvent) => {
        let nextIndex = Math.round(
            e.nativeEvent.contentOffset.x / this.props.layout.width
        );

        if (this.props.canJumpToTab(this.props.navigationState.routes[nextIndex])) {
            // console.info("navigationState nextIndex 2:" + nextIndex + "  old : " + this._curIndex,this.props.navigationState);

            if(this._curIndex == nextIndex){
                // nextIndex
                if(this.props.navigationState.index == this._curIndex){
                    this._curIndex = nextIndex;
                    // console.info("navigationState nextIndex:" + this._curIndex,"TTTT");
                    this.componentEnter();
                }
            }
            else {
                this._curIndex = nextIndex;
                this.componentEnter();
                // console.info("navigationState nextIndex:" + this._curIndex,"TT");
            }

            this.props.jumpToIndex(nextIndex);
        } else {
            // console.info("YYYY" + nextIndex + "",this.props.navigationState);
            global.requestAnimationFrame(() => {
                this._scrollTo(
                    this.props.navigationState.index * this.props.layout.width
                );
            });
        }

        // console.info("navigationState nextIndex:" + nextIndex + "  old : " + this._curIndex,this.props.navigationState);

    };

    _handleScroll = (e: ScrollEvent) => {
        if (this._isInitial) {
            return;
        }

        const { navigationState, layout } = this.props;
        const offset = navigationState.index * layout.width;

        this.props.offsetX.setValue(-offset);
        this.props.panX.setValue(offset - e.nativeEvent.contentOffset.x);

        global.cancelAnimationFrame(this._idleCallback);

        this._isIdle = false;
        this._idleCallback = global.requestAnimationFrame(() => {
            this._isIdle = true;
        });
    };

    render() {
        const { children, layout, navigationState } = this.props;
        return (
            <ScrollView
                horizontal
                pagingEnabled
                directionalLockEnabled
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps="always"
                overScrollMode="never"
                scrollEnabled={this.props.swipeEnabled}
                automaticallyAdjustContentInsets={false}
                bounces={false}
                alwaysBounceHorizontal={false}
                scrollsToTop={false}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={1}
                onScroll={this._handleScroll}
                onMomentumScrollEnd={this._handleMomentumScrollEnd}
                contentOffset={this.state.initialOffset}
                style={styles.container}
                contentContainerStyle={layout.width ? null : styles.container}
                ref={el => (this._scrollView = el)}
            >
                {React.Children.map(children, (child, i) => (
                    <View
                        key={navigationState.routes[i].key}
                        testID={navigationState.routes[i].testID}
                        style={
                            layout.width
                                ? { width: layout.width, overflow: 'hidden' }
                                : i === navigationState.index ? styles.page : null
                        }
                    >
                        {i === navigationState.index || layout.width ? child : null}
                    </View>
                ))}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    page: {
        flex: 1,
        overflow: 'hidden',
    },
});
