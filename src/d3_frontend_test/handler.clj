(ns d3-frontend-test.handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]))

(use 'ring.util.json-response)

(defn random-number-generator [n mx]
     [(take n (repeatedly #(rand-int mx)))] )

(defroutes app-routes

  (GET "/" [] "Hello World")
  (GET "/get_sample_dataset" []
    (json-response (apply map vector [(random-number-generator 10 10)
                                      (random-number-generator 10 10) ])

                       )
    )
  (route/not-found "Not Found"))

(def app
  (wrap-defaults app-routes site-defaults))

  ; (apply map vector [[:a :b :c]
  ;                    [:d :e :f]
  ;                    [:g :h :i]])

  ; (json-response {:n (rand-int 10)})
