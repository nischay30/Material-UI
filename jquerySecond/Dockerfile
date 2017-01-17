FROM mhart/alpine-node
RUN mkdir /app
WORKDIR /app
COPY . .
RUN ls -l
RUN npm install -g json-server yarn
RUN yarn
CMD ["npm", "run", "json"]
