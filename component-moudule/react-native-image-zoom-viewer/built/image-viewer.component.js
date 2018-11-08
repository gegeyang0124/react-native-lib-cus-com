"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var react_native_image_pan_zoom_1 = require("react-native-image-pan-zoom-zy");
var image_viewer_style_1 = require("./image-viewer.style");
var image_viewer_type_1 = require("./image-viewer.type");
var ImageViewer = (function (_super) {
    __extends(ImageViewer, _super);
    function ImageViewer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = new image_viewer_type_1.State();
        // 背景透明度渐变动画
        _this.fadeAnim = new react_native_1.Animated.Value(0);
        // 当前基准位置
        _this.standardPositionX = 0;
        // 整体位移，用来切换图片用
        _this.positionXNumber = 0;
        _this.positionX = new react_native_1.Animated.Value(0);
        _this.width = 0;
        _this.height = 0;
        _this.styles = image_viewer_style_1.default(0, 0, "transparent");
        // 是否执行过 layout. fix 安卓不断触发 onLayout 的 bug
        _this.hasLayout = false;
        // 记录已加载的图片 index
        _this.loadedIndex = new Map();
        _this.handleLongPressWithIndex = new Map();
        /**
         * 触发溢出水平滚动
         */
        _this.handleHorizontalOuterRangeOffset = function (offsetX) {
            _this.positionXNumber = _this.standardPositionX + offsetX;
            _this.positionX.setValue(_this.positionXNumber);
            if (offsetX < 0) {
                if (_this.state.currentShowIndex ||
                    0 < _this.props.imageUrls.length - 1) {
                    _this.loadImage((_this.state.currentShowIndex || 0) + 1);
                }
            }
            else if (offsetX > 0) {
                if (_this.state.currentShowIndex || 0 > 0) {
                    _this.loadImage((_this.state.currentShowIndex || 0) - 1);
                }
            }
        };
        /**
         * 手势结束，但是没有取消浏览大图
         */
        _this.handleResponderRelease = function (vx) {
            if (vx > 0.7) {
                // 上一张
                _this.goBack.call(_this);
                // 这里可能没有触发溢出滚动，为了防止图片不被加载，调用加载图片
                if (_this.state.currentShowIndex || 0 > 0) {
                    _this.loadImage((_this.state.currentShowIndex || 0) - 1);
                }
            }
            else if (vx < -0.7) {
                // 下一张
                _this.goNext.call(_this);
                if (_this.state.currentShowIndex || 0 < _this.props.imageUrls.length - 1) {
                    _this.loadImage((_this.state.currentShowIndex || 0) + 1);
                }
            }
            if (_this.positionXNumber - _this.standardPositionX >
                (_this.props.flipThreshold || 0)) {
                // 上一张
                _this.goBack.call(_this);
            }
            else if (_this.positionXNumber - _this.standardPositionX <
                -(_this.props.flipThreshold || 0)) {
                // 下一张
                _this.goNext.call(_this);
            }
            else {
                // 回到之前的位置
                _this.resetPosition.call(_this);
            }
        };
        /**
         * 到上一张
         */
        _this.goBack = function () {
            if (_this.state.currentShowIndex === 0) {
                // 回到之前的位置
                _this.resetPosition.call(_this);
                return;
            }
            _this.positionXNumber = _this.standardPositionX + _this.width;
            _this.standardPositionX = _this.positionXNumber;
            react_native_1.Animated.timing(_this.positionX, {
                toValue: _this.positionXNumber,
                duration: 100
            }).start();
            var nextIndex = (_this.state.currentShowIndex || 0) - 1;
            _this.setState({
                currentShowIndex: nextIndex
            }, function () {
                if (_this.props.onChange) {
                    _this.props.onChange(_this.state.currentShowIndex);
                }
            });
        };
        /**
         * 长按
         */
        _this.handleLongPress = function (image) {
            if (_this.props.saveToLocalByLongPress) {
                // 出现保存到本地的操作框
                _this.setState({ isShowMenu: true });
            }
            if (_this.props.onLongPress) {
                _this.props.onLongPress(image);
            }
        };
        /**
         * 单击
         */
        _this.handleClick = function () {
            if (_this.props.onClick) {
                _this.props.onClick(_this.handleCancel);
            }
        };
        /**
         * 双击
         */
        _this.handleDoubleClick = function () {
            if (_this.props.onDoubleClick) {
                _this.props.onDoubleClick(_this.handleCancel);
            }
        };
        /**
         * 退出
         */
        _this.handleCancel = function () {
            _this.hasLayout = false;
            if (_this.props.onCancel) {
                _this.props.onCancel();
            }
        };
        /**
         * 完成布局
         */
        _this.handleLayout = function (event) {
            if (_this.hasLayout) {
                return;
            }
            _this.hasLayout = true;
            _this.width = event.nativeEvent.layout.width;
            _this.height = event.nativeEvent.layout.height;
            _this.styles = image_viewer_style_1.default(_this.width, _this.height, _this.props.backgroundColor || "transparent");
            // 强制刷新
            _this.forceUpdate();
            _this.jumpToCurrentImage();
        };
        /**
         * 保存当前图片到本地相册
         */
        _this.saveToLocal = function () {
            if (!_this.props.onSave) {
                react_native_1.CameraRoll.saveToCameraRoll(_this.props.imageUrls[_this.state.currentShowIndex || 0].url);
                _this.props.onSaveToCamera(_this.state.currentShowIndex);
            }
            else {
                _this.props.onSave(_this.props.imageUrls[_this.state.currentShowIndex || 0].url);
            }
            _this.setState({ isShowMenu: false });
        };
        _this.handleLeaveMenu = function () {
            _this.setState({ isShowMenu: false });
        };
        _this.handleSwipeDown = function () {
            if (_this.props.onSwipeDown) {
                _this.props.onSwipeDown();
            }
            _this.handleCancel();
        };
        return _this;
    }
    ImageViewer.prototype.componentWillMount = function () {
        this.init(this.props);
    };
    ImageViewer.prototype.componentWillReceiveProps = function (nextProps) {
        var _this = this;
        if (nextProps.index !== this.state.currentShowIndex) {
            this.setState({
                currentShowIndex: nextProps.index
            }, function () {
                // 立刻预加载要看的图
                _this.loadImage(nextProps.index || 0);
                _this.jumpToCurrentImage();
                // 显示动画
                react_native_1.Animated.timing(_this.fadeAnim, {
                    toValue: 1,
                    duration: 200
                }).start();
            });
        }
    };
    /**
     * props 有变化时执行
     */
    ImageViewer.prototype.init = function (nextProps) {
        var _this = this;
        if (nextProps.imageUrls.length === 0) {
            // 隐藏时候清空
            this.fadeAnim.setValue(0);
            return this.setState(new image_viewer_type_1.State());
        }
        // 给 imageSizes 塞入空数组
        var imageSizes = [];
        nextProps.imageUrls.forEach(function (imageUrl) {
            imageSizes.push({
                width: imageUrl.width || 0,
                height: imageUrl.height || 0,
                status: "loading"
            });
        });
        this.setState({
            currentShowIndex: nextProps.index,
            imageSizes: imageSizes
        }, function () {
            // 立刻预加载要看的图
            _this.loadImage(nextProps.index || 0);
            _this.jumpToCurrentImage();
            // 显示动画
            react_native_1.Animated.timing(_this.fadeAnim, {
                toValue: 1,
                duration: 200
            }).start();
        });
    };
    /**
     * 调到当前看图位置
     */
    ImageViewer.prototype.jumpToCurrentImage = function () {
        // 跳到当前图的位置
        this.positionXNumber = -this.width * (this.state.currentShowIndex || 0);
        this.standardPositionX = this.positionXNumber;
        this.positionX.setValue(this.positionXNumber);
    };
    /**
     * 加载图片
     */
    ImageViewer.prototype.loadImage = function (index) {
        var _this = this;
        if (!this.state.imageSizes[index]) {
            return;
        }
        if (this.loadedIndex.has(index)) {
            return;
        }
        this.loadedIndex.set(index, true);
        var image = this.props.imageUrls[index];
        var imageStatus = __assign({}, this.state.imageSizes[index]);
        // 保存 imageSize
        var saveImageSize = function () {
            // 如果已经 success 了，就不做处理
            if (_this.state.imageSizes[index] &&
                _this.state.imageSizes[index].status !== "loading") {
                return;
            }
            var imageSizes = _this.state.imageSizes.slice();
            imageSizes[index] = imageStatus;
            _this.setState({ imageSizes: imageSizes });
        };
        if (this.state.imageSizes[index].status === "success") {
            // 已经加载过就不会加载了
            return;
        }
        // 如果已经有宽高了，直接设置为 success
        if (this.state.imageSizes[index].width > 0 &&
            this.state.imageSizes[index].height > 0) {
            imageStatus.status = "success";
            saveImageSize();
            return;
        }
        // 是否加载完毕了图片大小
        var sizeLoaded = false;
        // 是否加载完毕了图片
        var imageLoaded = false;
        // 如果图片是 file: 开头，说明是本地图片，默认已经加载完毕
        if (image.url.startsWith("file:")) {
            imageLoaded = true;
        }
        if (react_native_1.Platform.OS !== "web") {
            var prefetchImagePromise = react_native_1.Image.prefetch(image.url);
            if (image.url.match(/^(http|https):\/\//)) {
                prefetchImagePromise.then(function () {
                    imageLoaded = true;
                    if (sizeLoaded) {
                        imageStatus.status = "success";
                        saveImageSize();
                    }
                }, function () {
                    imageStatus.status = "fail";
                    saveImageSize();
                });
            }
            else {
                // 本地图片
                imageLoaded = true;
                prefetchImagePromise
                    .then(function () {
                    //
                })
                    .catch(function () {
                    //
                });
                if (sizeLoaded) {
                    imageStatus.status = "success";
                    saveImageSize();
                }
            }
            // 获取图片大小
            if (image.width && image.height) {
                // 如果已经传了图片长宽,那直接 success
                sizeLoaded = true;
                imageStatus.width = image.width;
                imageStatus.height = image.height;
                if (imageLoaded) {
                    imageStatus.status = "success";
                    saveImageSize();
                }
            }
            else {
                react_native_1.Image.getSize(image.url, function (width, height) {
                    sizeLoaded = true;
                    imageStatus.width = width;
                    imageStatus.height = height;
                    if (imageLoaded) {
                        imageStatus.status = "success";
                        saveImageSize();
                    }
                }, function (error) {
                    // 获取大小失败
                    imageStatus.status = "fail";
                    saveImageSize();
                });
            }
        }
        else {
            var imageFetch_1 = new window.Image();
            imageFetch_1.src = image.url;
            imageFetch_1.onload = function () {
                imageStatus.width = imageFetch_1.width;
                imageStatus.height = imageFetch_1.height;
                imageStatus.status = "success";
                saveImageSize();
            };
            imageFetch_1.onerror = function () {
                imageStatus.status = "fail";
                saveImageSize();
            };
        }
    };
    /**
     * 到下一张
     */
    ImageViewer.prototype.goNext = function () {
        var _this = this;
        if (this.state.currentShowIndex === this.props.imageUrls.length - 1) {
            // 回到之前的位置
            this.resetPosition.call(this);
            return;
        }
        this.positionXNumber = this.standardPositionX - this.width;
        this.standardPositionX = this.positionXNumber;
        react_native_1.Animated.timing(this.positionX, {
            toValue: this.positionXNumber,
            duration: 100
        }).start();
        var nextIndex = (this.state.currentShowIndex || 0) + 1;
        this.setState({
            currentShowIndex: nextIndex
        }, function () {
            if (_this.props.onChange) {
                _this.props.onChange(_this.state.currentShowIndex);
            }
        });
    };
    /**
     * 回到原位
     */
    ImageViewer.prototype.resetPosition = function () {
        this.positionXNumber = this.standardPositionX;
        react_native_1.Animated.timing(this.positionX, {
            toValue: this.standardPositionX,
            duration: 150
        }).start();
    };
    /**
     * 获得整体内容
     */
    ImageViewer.prototype.getContent = function () {
        var _this = this;
        // 获得屏幕宽高
        var screenWidth = this.width;
        var screenHeight = this.height;
        var ImageElements = this.props.imageUrls.map(function (image, index) {
            if (!_this.handleLongPressWithIndex.has(index)) {
                _this.handleLongPressWithIndex.set(index, _this.handleLongPress.bind(_this, image));
            }
            var width = _this.state.imageSizes[index] &&
                _this.state.imageSizes[index].width;
            var height = _this.state.imageSizes[index] && _this.state.imageSizes[index].height;
            var imageInfo = _this.state.imageSizes[index];
            // 如果宽大于屏幕宽度,整体缩放到宽度是屏幕宽度
            if (width > screenWidth) {
                var widthPixel = screenWidth / width;
                width *= widthPixel;
                height *= widthPixel;
            }
            // 如果此时高度还大于屏幕高度,整体缩放到高度是屏幕高度
            if (height > screenHeight) {
                var HeightPixel = screenHeight / height;
                width *= HeightPixel;
                height *= HeightPixel;
            }
            var Wrapper = function (_a) {
                var children = _a.children, others = __rest(_a, ["children"]);
                return (<react_native_image_pan_zoom_1.default cropWidth={_this.width} cropHeight={_this.height} maxOverflow={_this.props.maxOverflow} horizontalOuterRangeOffset={_this.handleHorizontalOuterRangeOffset} responderRelease={_this.handleResponderRelease} onLongPress={_this.handleLongPressWithIndex.get(index)} onClick={_this.handleClick} onDoubleClick={_this.handleDoubleClick} enableSwipeDown={true} onSwipeDown={_this.handleSwipeDown} {...others}>
          {children}
        </react_native_image_pan_zoom_1.default>);
            };
            switch (imageInfo.status) {
                case "loading":
                    return (<Wrapper key={index} style={__assign({}, _this.styles.modalContainer, _this.styles.loadingContainer)} imageWidth={screenWidth} imageHeight={screenHeight}>
              <react_native_1.View style={_this.styles.loadingContainer}>
                {_this.props.loadingRender()}
              </react_native_1.View>
            </Wrapper>);
                case "success":
                    var finalProps = __assign({}, (image.props || {}));
                    if (!finalProps.style) {
                        finalProps.style = {};
                    }
                    if (!finalProps.source) {
                        finalProps.source = {};
                    }
                    finalProps.style = __assign({}, finalProps.style, _this.styles.imageStyle, { width: width,
                        height: height });
                    finalProps.source = __assign({}, finalProps.source, { uri: image.url });
                    return (<react_native_image_pan_zoom_1.default key={index} cropWidth={_this.width} cropHeight={_this.height} maxOverflow={_this.props.maxOverflow} horizontalOuterRangeOffset={_this.handleHorizontalOuterRangeOffset} responderRelease={_this.handleResponderRelease} onLongPress={_this.handleLongPressWithIndex.get(index)} onClick={_this.handleClick} onDoubleClick={_this.handleDoubleClick} imageWidth={width} imageHeight={height} enableSwipeDown={true} onSwipeDown={_this.handleSwipeDown}>
              <react_native_1.Image {...finalProps}/>
            </react_native_image_pan_zoom_1.default>);
                case "fail":
                    return (<Wrapper key={index} style={_this.styles.modalContainer} imageWidth={_this.props.failImageSource
                        ? _this.props.failImageSource.width
                        : screenWidth} imageHeight={_this.props.failImageSource
                        ? _this.props.failImageSource.height
                        : screenHeight}>
              {_this.props.failImageSource && (<react_native_1.Image source={{
                        uri: _this.props.failImageSource.url
                    }} style={{
                        width: _this.props.failImageSource.width,
                        height: _this.props.failImageSource.height
                    }}/>)}
            </Wrapper>);
            }
        });
        return (<react_native_1.Animated.View style={{ zIndex: 9999 }}>
        <react_native_1.Animated.View style={__assign({}, this.styles.container, { opacity: this.fadeAnim })}>
          {this.props.renderHeader(this.state.currentShowIndex)}

          <react_native_1.View style={this.styles.arrowLeftContainer}>
            <react_native_1.TouchableWithoutFeedback onPress={this.goBack}>
              <react_native_1.View>{this.props.renderArrowLeft()}</react_native_1.View>
            </react_native_1.TouchableWithoutFeedback>
          </react_native_1.View>

          <react_native_1.View style={this.styles.arrowRightContainer}>
            <react_native_1.TouchableWithoutFeedback onPress={this.goNext}>
              <react_native_1.View>{this.props.renderArrowRight()}</react_native_1.View>
            </react_native_1.TouchableWithoutFeedback>
          </react_native_1.View>

          <react_native_1.Animated.View style={__assign({}, this.styles.moveBox, { transform: [{ translateX: this.positionX }], width: this.width * this.props.imageUrls.length })}>
            {ImageElements}
          </react_native_1.Animated.View>
          {this.props.renderIndicator((this.state.currentShowIndex || 0) + 1, this.props.imageUrls.length)}

          {this.props.imageUrls[this.state.currentShowIndex || 0] &&
            this.props.imageUrls[this.state.currentShowIndex || 0]
                .originSizeKb &&
            this.props.imageUrls[this.state.currentShowIndex || 0]
                .originUrl && (<react_native_1.View style={this.styles.watchOrigin}>
                <react_native_1.TouchableOpacity style={this.styles.watchOriginTouchable}>
                  <react_native_1.Text style={this.styles.watchOriginText}>查看原图(2M)</react_native_1.Text>
                </react_native_1.TouchableOpacity>
              </react_native_1.View>)}
          <react_native_1.View style={[
            { bottom: 0, position: "absolute", zIndex: 9999 },
            this.props.footerContainerStyle
        ]}>
            {this.props.renderFooter(this.state.currentShowIndex)}
          </react_native_1.View>
        </react_native_1.Animated.View>
      </react_native_1.Animated.View>);
    };
    ImageViewer.prototype.getMenu = function () {
        if (!this.state.isShowMenu) {
            return null;
        }
        return (<react_native_1.View style={this.styles.menuContainer}>
        <react_native_1.View style={this.styles.menuShadow}/>
        <react_native_1.View style={this.styles.menuContent}>
          <react_native_1.TouchableHighlight underlayColor="#F2F2F2" onPress={this.saveToLocal} style={this.styles.operateContainer}>
            <react_native_1.Text style={this.styles.operateText}>
              {this.props.menuContext.saveToLocal}
            </react_native_1.Text>
          </react_native_1.TouchableHighlight>
          <react_native_1.TouchableHighlight underlayColor="#F2F2F2" onPress={this.handleLeaveMenu} style={this.styles.operateContainer}>
            <react_native_1.Text style={this.styles.operateText}>
              {this.props.menuContext.cancel}
            </react_native_1.Text>
          </react_native_1.TouchableHighlight>
        </react_native_1.View>
      </react_native_1.View>);
    };
    ImageViewer.prototype.render = function () {
        var childs = null;
        childs = (<react_native_1.View>
        {this.getContent()}
        {this.getMenu()}
      </react_native_1.View>);
        return (<react_native_1.View onLayout={this.handleLayout} style={__assign({ flex: 1, overflow: "hidden" }, this.props.style)}>
        {childs}
      </react_native_1.View>);
    };
    ImageViewer.defaultProps = new image_viewer_type_1.Props();
    return ImageViewer;
}(React.Component));
exports.default = ImageViewer;
//# sourceMappingURL=image-viewer.component.js.map