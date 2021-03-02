"use strict";

/** @type Egg.EggPlugin */
exports.mysql = {
  enable: true,
  package: "egg-mysql",
};

exports.cors = {
  enable: true,
  package: "egg-cors",
};

exports.io = {
  enable: true,
  package: "egg-socket.io",
};

exports.jwt = {
  enable: true,
  package: "egg-jwt",
};
