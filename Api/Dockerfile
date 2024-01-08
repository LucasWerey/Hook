# Start from a Rust base image
FROM rust:1.56 as builder

# Create a new empty shell project
RUN USER=root cargo new --bin rust-api
WORKDIR /rust-api

# Copy over your manifest
COPY ./Cargo.toml ./Cargo.toml

# This build step will cache your dependencies
RUN cargo build --release
RUN rm src/*.rs

# Copy your source tree
COPY ./src ./src

# Build for release
RUN rm ./target/release/deps/rust_api*
RUN cargo build --release

# Our second stage, that will be the final image
FROM debian:buster-slim

# Install OpenSSL
RUN apt-get update
RUN apt-get install -y openssl

# Copy the build artifact from the builder stage and set the startup command
COPY --from=builder /rust-api/target/release/rust-api .

# Set the startup command to run your binary
CMD ["./target/release/ApiPfe"]