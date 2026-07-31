import React from "react";

export default class ErrorOverlay extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("[ErrorOverlay] Render crash:", error, info?.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#1a0000",
            color: "#ffb4b4",
            fontFamily: "monospace",
            fontSize: 13,
            padding: 20,
            overflow: "auto",
            zIndex: 9999,
            whiteSpace: "pre-wrap",
          }}
        >
          <strong>Scene crashed:</strong>
          {"\n\n"}
          {this.state.error.message}
          {"\n\n"}
          {this.state.error.stack}
        </div>
      );
    }
    return this.props.children;
  }
}