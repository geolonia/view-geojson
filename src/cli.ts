#!/usr/bin/env node
import { isatty } from "tty";
import serve from './serve'

process.stdin.resume();
process.stdin.setEncoding("utf8");

let data = "";

const onEnd = () => {
  try {
    serve(data);
  } catch (e) {
    console.error(e)
    process.exit(1);
  }
};

if (isatty(0)) {
  onEnd();
} else {
  process.stdin.on("data", chunk => (data += chunk));
  process.stdin.on("end", onEnd);
}
