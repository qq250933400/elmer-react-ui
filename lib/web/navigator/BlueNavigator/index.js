'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _style = require('./style.scss');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import { PropTypes } from 'prop-types';


var BlueNavigator = function (_Component) {
    _inherits(BlueNavigator, _Component);

    function BlueNavigator() {
        _classCallCheck(this, BlueNavigator);

        return _possibleConstructorReturn(this, (BlueNavigator.__proto__ || Object.getPrototypeOf(BlueNavigator)).apply(this, arguments));
    }

    _createClass(BlueNavigator, [{
        key: 'render',
        value: function render() {
            var exClass = this.props.isFullScreen ? _style2.default.BlueNavigatorFullScreen : '';
            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)([_style2.default.BlueNavigator, exClass]) },
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'ul',
                        null,
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    'Home'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    'Home'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    'Home'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    'Home'
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return BlueNavigator;
}(_react.Component);

BlueNavigator.propTypes = {
    isFullScreen: _react.PropTypes.bool.isRequired
};

BlueNavigator.defaultProps = {
    isFullScreen: true
};

exports.default = BlueNavigator;