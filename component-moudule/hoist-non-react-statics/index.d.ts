// declare module 'hoist-non-react-statics' {
declare module 'hoist-non-react-statics-zy' {
  import * as React from 'react';
  function hoistNonReactStatics<Own, Custom>(
    TargetComponent: React.ComponentType<Own>,
    SourceComponent: React.ComponentType<Own & Custom>,
    customStatic?: any): React.ComponentType<Own>;
    
  export = hoistNonReactStatics
}
