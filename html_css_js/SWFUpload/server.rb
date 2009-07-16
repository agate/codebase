# base gems
require 'rubygems'
require 'ruby-debug'
require 'haml'
# sinatra
require 'sinatra'

set :public, File.dirname(__FILE__) + '/public'
set :views,  File.dirname(__FILE__) + '/views'

get '/' do
  haml :index
end

post '/upload' do
  'ok'
end
