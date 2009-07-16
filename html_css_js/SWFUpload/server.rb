# base gems
require 'rubygems'
require 'ruby-debug'
require 'haml'
# sinatra
require 'sinatra'

set :public, File.dirname(__FILE__) + '/public'
set :views,  File.dirname(__FILE__) + '/views'

UPLOAD_PATH = File.dirname(__FILE__) + '/upload'

get '/' do
  haml :index
end

post '/upload' do
  f = params[:file][:tempfile]
  FileUtils.mv(f.path, UPLOAD_PATH)
end
