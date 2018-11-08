/* Helpers for navigation */
import React, {Component} from 'react';
import NavigationActions from './NavigationActions';
import invariant from './utils/invariant';
import StackPages from './routers/StackPages';
import * as TD from 'react-native-talkingdata';

var evt = null;
var isExe = true;

var couSum = 0;

export default function(navigation) {
    const nav =  {
        ...navigation,
        setEvt:(func)=>evt=func,
        goBack: key => {

            let actualizedKey = key;
            if (key === undefined && navigation.state.key) {
                invariant(
                    typeof navigation.state.key === 'string',
                    'key should be a string'
                );
                actualizedKey = navigation.state.key;
            }
            return navigation.dispatch(
                NavigationActions.back({ key: actualizedKey })
            );
        },
        navigateTo:(navigateTo, params, action) => {

            let page = {};

            if(StackPages.stackPagesHistory.length > 0){
                page = StackPages.stackPagesHistory[StackPages.stackPagesHistory.length - 1];
                let clsPre = StackPages.stackPages[page.routeName].screen.prototype;;
                if(clsPre.context){
                    // clsPre.context.componentWillExit&&clsPre.context.componentWillExit.bind(clsPre.context);
                    clsPre.context.componentWillExit&&clsPre.context.componentWillExit(
                        page.params,page.action,page.routeName);
                }
            }

            nav.navigate(navigateTo, params, action);

            let cls = StackPages.stackPages[navigateTo].screen.prototype;

            if(cls.context){
                // cls.context.componentWillEnter&&cls.context.componentWillEnter.bind(cls.context);
                //第二个参数是否返回，true进入，false： 返回
                cls.context.componentWillEnter&&cls.context.componentWillEnter(params,action,navigateTo);

                StackPages.stackPagesHistory.push({
                    routeName:navigateTo,
                    params:params,
                    action:action
                });
            }
        },
        navigate: (navigateTo, params, action) => {
            evt&&evt();

            let obj = {
                routeName:navigateTo
            };
            if(params){
                obj.params = JSON.parse(JSON.stringify(params));
            }
            if(action){
                obj.action = action;
            }

            if(params){
                params.params = obj;
            }
            else {
                params = {
                    params:obj
                };
            }

            /*if(StackPages.curPageState.isExe
                && navigateTo != 'DrawerToggle'
                && navigateTo != 'DrawerOpen'
                && navigateTo != 'DrawerClose'){
                // StackPages.curPageState.isExe = false;
                let obj = JSON.stringify({
                    routeName:navigateTo,
                    params:params,
                    action:action,
                    isExe:false,
                });
                obj = JSON.parse(obj);
                obj.action = action;
                StackPages.curPageState = obj;

                /!*setTimeout(()=>{
                    let page = {};

                    if(StackPages.stackPagesHistory.length > 0){
                        page = StackPages.stackPagesHistory[StackPages.stackPagesHistory.length - 1];

                        TD.trackPageEnd(page.routeName);

                        let clsPre = StackPages.stackPages[page.routeName].screen.prototype;;
                        if(clsPre.context){
                            // clsPre.context.componentWillExit&&clsPre.context.componentWillExit.bind(clsPre.context);
                            clsPre.context.componentWillExit&&clsPre.context.componentWillExit(
                                page.params,page.action,page.routeName);
                        }
                    }

                    let cls = StackPages.stackPages[navigateTo].screen.prototype;
                    /!* console.info("cls",cls);
                     if(StackPages.stackPages[navigateTo].context == undefined){
                         StackPages.stackPages[navigateTo]["context"] = cls.screen.__proto__.screen;
                         // console.info(navigateTo + "  cls.screen.__proto__.screen: ",cls.screen.__proto__.screen);
                     }
                     cls = StackPages.stackPages[navigateTo];*!/
                    if(cls.context){

                        TD.trackPageBegin(navigateTo);

                        // cls.context.componentWillEnter&&cls.context.componentWillEnter.bind(cls.context);
                        //第二个参数是否返回，true进入，false： 返回
                        cls.context.componentWillEnter&&cls.context.componentWillEnter(params,action,navigateTo);

                        StackPages.stackPagesHistory.push(StackPages.curPageState);
                    }

                    // let componentWillEnter = cls.screen.prototype.componentWillEnter;
                    /!* cls.screen.prototype.componentWillEnter&&cls.screen.prototype.componentWillEnter.bind(cls.screen);
                     cls.screen.prototype.componentWillEnter&&cls.screen.prototype.componentWillEnter(params,action,navigateTo);
                     *!/
                },0);*!/
            }*/

            let nav = null;
            if (typeof navigateTo === 'string') {
                // console.info("page navigate",navigation);
                /*return navigation.dispatch(
                    NavigationActions.navigate({ routeName: navigateTo, params, action })
                );*/
                nav = navigation.dispatch(
                    NavigationActions.navigate({ routeName: navigateTo, params, action })
                );
            }
            else {
                invariant(
                    typeof navigateTo === 'object',
                    'Must navigateTo an object or a string'
                );
                invariant(
                    params == null,
                    'Params must not be provided to .navigate() when specifying an object'
                );
                invariant(
                    action == null,
                    'Child action must not be provided to .navigate() when specifying an object'
                );
                nav = navigation.dispatch(NavigationActions.navigate(navigateTo));
            }

            return nav;
        },
        pop: (n, params) =>
            navigation.dispatch(
                NavigationActions.pop({ n, immediate: params && params.immediate })
            ),
        popToTop: params =>
            navigation.dispatch(
                NavigationActions.popToTop({ immediate: params && params.immediate })
            ),
        /**
         * For updating current route params. For example the nav bar title and
         * buttons are based on the route params.
         * This means `setParams` can be used to update nav bar for example.
         */
        setParams: params => {
            invariant(
                navigation.state.key && typeof navigation.state.key === 'string',
                'setParams cannot be called by root navigator'
            );
            const key = navigation.state.key;
            return navigation.dispatch(NavigationActions.setParams({ params, key }));
        },

        getParam: (paramName, defaultValue) => {
            const params = navigation.state.params;

            if (params && paramName in params) {
                return params[paramName];
            }

            return defaultValue;
        },

        push: (routeName, params, action) =>
            navigation.dispatch(
                NavigationActions.push({ routeName, params, action })
            ),

        replace: (routeName, params, action) =>
            navigation.dispatch(
                NavigationActions.replace({
                    routeName,
                    params,
                    action,
                    key: navigation.state.key,
                })
            ),
    };

    return nav;
}
