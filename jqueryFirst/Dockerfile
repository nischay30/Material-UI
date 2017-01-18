FROM mhart/alpine-node

RUN mkdir /app
WORKDIR /app
RUN npm install -g http-server yarn
COPY . .
RUN ls -l
RUN yarn
CMD ["http-server"]

