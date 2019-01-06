(defproject d3-frontend-test "0.1.0-SNAPSHOT"
  :description "Trying to serve a D3 frontend"
  :url "http://example.com/FIXME"
  :min-lein-version "2.0.0"
  :dependencies [[org.clojure/clojure "1.9.0"]
                 [compojure "1.6.1"]
                 [ring/ring-defaults "0.3.2"]
                 [ring-json-response "0.2.0"]]
  :plugins [[lein-ring "0.12.4"]]
  :ring {:handler d3-frontend-test.handler/app}
  :profiles
  {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                        [ring/ring-mock "0.3.2"]]}})
