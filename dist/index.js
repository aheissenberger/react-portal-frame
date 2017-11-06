'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;
var _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactDOM = require('react-dom');
var Types = require('prop-types');

var noop = function noop() {};
var EVENTS = ['Copy', 'Cut', 'Paste', 'CompositionEnd', 'CompositionStart', 'CompositionUpdate', 'KeyDown', 'KeyPress', 'KeyUp', 'Focus', 'Blur', 'Change', 'Input', 'Invalid', 'Submit', 'Click', 'ContextMenu', 'DoubleClick', 'Drag', 'DragEnd', 'DragEnter', 'DragExit', 'DragLeave', 'DragOver', 'DragStart', 'Drop', 'MouseDown', 'MouseEnter', 'MouseLeave', 'MouseMove', 'MouseOut', 'MouseOver', 'MouseUp', 'Select', 'TouchCancel', 'TouchEnd', 'TouchMove', 'TouchStart', 'Scroll', 'Wheel', 'Abort', 'CanPlay', 'CanPlayThrough', 'DurationChange', 'Emptied', 'Encrypted', 'Ended', 'Error', 'LoadedData', 'LoadedMetadata', 'LoadStart', 'Pause', 'Play', 'Playing', 'Progress', 'RateChange', 'Seeked', 'Seeking', 'Stalled', 'Suspend', 'TimeUpdate', 'VolumeChange', 'Waiting', 'Load', 'Error', 'AnimationStart', 'AnimationEnd', 'AnimationIteration', 'TransitionEnd', 'Toggle'].reduce(function (m, e) {
	m['on' + e] = noop;
	if (e !== 'MouseEnter' && e !== 'MouseLeave') m['on' + e + 'Capture'] = noop;
	return m;
}, {});

module.exports = (_temp = _class = function (_React$PureComponent) {
	_inherits(_class, _React$PureComponent);

	_createClass(_class, [{
		key: 'getChildContext',
		value: function getChildContext() {
			return {
				frame: this.frame,
				window: this.window,
				document: this.document
			};
		}
	}]);

	function _class() {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

		_this.handleLoad = _this.handleLoad.bind(_this);
		_this.el = document.createElement('div');
		_this.state = { loaded: false };
		return _this;
	}

	_createClass(_class, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.frame.addEventListener('load', this.handleLoad, true);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.frame.removeEventListener('load', this.handleLoad, true);
			delete this.frame;
			delete this.el;
		}
	}, {
		key: 'handleLoad',
		value: function handleLoad() {
			this.document.head.innerHTML = this.props.head || '';
			var root = this.frame.contentDocument.querySelector('html');
			this.frame.contentDocument.body.remove();
			this.setState({ root: root });
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			return React.createElement(
				'iframe',
				_extends({}, this.props, {
					ref: function ref(el) {
						return _this2.frame = el;
					},
					srcDoc: '<!DOCTYPE html>',
					style: _extends({
						border: 0,
						width: '100%'
					}, this.props.style)
				}),
				this.state.root ? ReactDOM.createPortal(React.createElement(
					'body',
					EVENTS,
					this.props.children
				), this.state.root) : null
			);
		}
	}, {
		key: 'document',
		get: function get() {
			return this.frame ? this.frame.contentDocument : void 0;
		}
	}, {
		key: 'window',
		get: function get() {
			return this.frame ? this.frame.contentWindow : void 0;
		}
	}]);

	return _class;
}(React.PureComponent), _class.displayName = 'PortalFrame', _class.propTypes = {
	children: Types.any,
	style: Types.object,
	head: Types.any
}, _class.childContextTypes = {
	frame: Types.any,
	window: Types.any,
	document: Types.any
}, _temp);
